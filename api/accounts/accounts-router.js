const express = require("express")
const db = require("../../data/dbConfig")

const router = express.Router()

//GET all accounts
router.get("/", async (req, res, next) => {
	try {
		//defines accounts from the db so we can use it
		const accounts = await db.select("*").from("accounts")
		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

//GET account BY id
router.get("/:id", async (req, res, next) => {
	try {
		//SELECTY * FROM messages WHERE ID = :id LIMIT 1
		const [account] = await db
			.select("*")
			.from("accounts")
			.where("id", req.params.id)
			.limit(1)

		res.json(account)
	} catch (err) {
		next(err)
	}
})

//POST account
router.post("/", async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
		}
		const [ID] = await db.insert(payload).into("accounts")
		const acc = await db.first("*").from("accounts").where("id", ID)

		res.status(201).json(acc)
	} catch (err) {
		next(err)
	}
})

//PUT (edit) account
router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
		}
		await db("accounts").update(payload).where("id", req.params.id)
		const acc = await db.first("*").from("accounts").where("id", req.params.id)

		res.json(acc)
	} catch (err) {
		next(err)
	}
})

//DELETE account
router.delete("/:id", async (req, res, next) => {
	try {
		await db("accounts").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})


module.exports = router