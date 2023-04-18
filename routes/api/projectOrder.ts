import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

//@route GET api/projectorder
//@desc return projectorder
//@access Public
router.get('/', async (req, res) => {
  try {
    const projectOrder = await prisma.projectOrder.findMany()
    return res.status(200).json(projectOrder)
  } catch (error) {
    return res.status(404).json({ error })
  }
})

//@route POST api/projectorder
//@desc return projectorder
//@access Public
router.post('/', async (req, res) => {
  const { projectOrder } = req.body
  try {
    const order = await prisma.projectOrder.create({
      data: {
        projectOrder
      },
    })
    return res.status(200).json(order)
  } catch (error) {
    res.status(404).json({ error })
  }
})

// @route PUT api/projectorder
// @desc return projectorder
// @access Public
router.put('/', async (req, res) => {
  const { projectOrder, id } = req.body
  try {
    const Order = await prisma.projectOrder.update({
      where: {
        id
      },
      data: {
        projectOrder
      },
    })
    return res.status(200).json(Order)
  } catch (error) {
    res.status(404).json({ error })
  }
})

//@route PUT api/projectorder/push
//@prisma PUSH new projectID into projectOrder array
//@desc return projectorder
//@access Public
router.put('/push', async (req, res) => {
  const { projectOrder } = req.body
  try {
    const order = await prisma.projectOrder.update({
      where: {
        id: '643d52be0267cc97bfcf75f3'
      },
      data: {
        projectOrder: {
          push: projectOrder
        }
      },
    })
    return res.status(200).json(order)
  } catch (error) {
    res.status(404).json({ error })
  }
})




export default router