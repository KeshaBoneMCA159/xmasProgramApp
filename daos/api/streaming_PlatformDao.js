// Step 25 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')
const daoCommon = require('../common/daoCommon')

const streaming_PlatformDao = {
  table: 'streaming_platform',

  findAllStreaming_Platforms: (res) => {
    const sql = `SELECT * FROM streaming_platform`

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

  findProgramsByStreaming_PlatformId: (res, id) => {
    const sql = `
      SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
      FROM program p
      JOIN program_to_streaming pts ON p.program_id = pts.program_id
      WHERE pts.sp_id = ?;
    `

    con.execute(sql, [id], (error, rows) => {
      queryAction(res, error, rows)
    })
  },

  create: (req, res, table, body) => {
    daoCommon.create(req, res, table, body)
  },

  update: (req, res, table, body, id) => {
    con.query(
      `UPDATE streaming_platform SET ? WHERE sp_id = ?`,
      [body, id],
      (error, rows) => {
        queryAction(res, error, rows, table)
      }
    )
  }
}

module.exports = streaming_PlatformDao
