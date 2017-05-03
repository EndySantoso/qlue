var express = require('express')
var axios = require('axios')
var router = express.Router()

// link untuk tarik data dari API qlue
router.get('/api/qlue', function (req, res, next) {
  axios.get('http://www.qlue.co.id/vacancy/svc/getDataExample.php')
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    console.log(error)
  })
})

// link untuk tarik data dari API waze
router.get('/api/waze', function (req, res, next) {
  axios.get('http://waze.qlue.id/jakarta/update/0atxn84I3hx2WmNm5ifPDZkJaLERZD9A.json')
  .then(response => {
    res.send(response.data.alerts)
  })
  .catch(error => {
    console.log(error)
  })
})

module.exports = router
