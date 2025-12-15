// Step 25 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')
const daoCommon = require('../common/daoCommon')

const actorDao = {
  table: 'actor',

  findAllActors: (res) => {
    const sql = `SELECT * FROM actor`

    con.execute(sql, (error, rows) => {
      queryAction(res, error, rows)
    })
  },

  findById: (res, id) => {
    con.execute(
      `SELECT * FROM \`actor\` WHERE \`actor_id\` = ?;`,
      [id],
      (error, rows) => {
        queryAction(res, error, rows)
      }
    )
  },

  findProgramsByActorId: (res, id) => {
    const sql = `
      SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
      FROM program p
      JOIN program_to_actor pta ON p.program_id = pta.program_id
      WHERE pta.actor_id = ?;
    `

    con.execute(sql, [id], (error, rows) => {
      queryAction(res, error, rows)
    })
  },

  create: (req, res, table, body) => {
    daoCommon.create(req, res, table, body)
  },

  update: (req, res, table, body, id) => {
    daoCommon.update(req, res, table, body, id)
  }
}

module.exports = actorDao
