const router = require('express').Router();
const Class = require('../models/Class')
const Student = require('../models/Student')
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


router.post('/', async (req, res) => {
    try {
        if (!req.body.class || !req.body.studentsCount) {
            res.status(400).json({
                message: "Please send required files"
            })
        }

        const myClass = await Class.create({
            class: req.body.class,
            studentsCount: req.body.studentsCount
        })
        res.status(201).json({
            id: myClass._id
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const classes = await Class.find()
        res.status(200).json({
            classes
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/:myClassId', async (req, res) => {
    const { myClassId } = req.params
    try {
        const myClass = await Class.findOne({ _id: myClassId })
        if (!myClass) {
            res.status(404).json({
                message: "There is no Class found with that id."
            })
        }
        res.status(200).json(
            myClass
        )
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
router.delete('/:myClassId', async (req, res) => {
    const { myClassId } = req.params
    try {
        await Class.deleteOne({ _id: myClassId })

        res.status(204).end()
    } catch (err) {
        res.status(404).json({
            message: err.message,
            error: "There is no task at that id."
        })
    }
})




router.post('/:myClassId/students', async (req, res) => {
    const { myClassId } = req.params;

    try {
        if (!req.body.name || !req.body.classId || !myClassId) {
            return res.status(400).json({
                message: "Please send required fields."
            })
        }
        const student = await Student.create({
            name: req.body.name,
            classId: myClassId
        })

        res.status(201).json({
            studentId: student._id
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/:myClassId/students', async (req, res) => {
    const { myClassId } = req.params

    try {
        const students = await Student.find({ classId: myClassId })
        res.status(200).json({
            students
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
router.get('/:myClassId/students/:studentId', async (req, res) => {
    const { myClassId, studentId } = req.params;
    try {
        const student = await Student.findOne({ _id: studentId })

        res.status(200).json(
            student
        )
    }
    catch (err) {
        res.status(404).json({
            message: err.message,
            error: "There is no student of that id"

        })
    }
})

router.put('/:myClassId/students/:studentId', async (req, res) => {
    const { myClassId, studentId } = req.params;
    try {
        await Student.findOne({ _id: studentId })

        res.status(204).end()
    }
    catch (err) {
        res.status(404).json({
            error: 'No student found with that id.',
            message: err.message
        })
    }
})
router.delete('/:myClassId/students/:studentId', async (req, res) => {
    const { myClassId, studentId } = req.params;
    try {
        await Student.deleteOne({ _id: studentId })
        res.status(204).end()
    }
    catch (err) {
        res.status(404).json({
            error: "There is no task at that id",
            message: err.message
        })
    }
})

module.exports = router