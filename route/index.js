const express = require('express')
const mysql = require('mysql')
const common = require('../libs/common')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'qizi'
})
module.exports = () => {
  const route = express.Router()

  const getTestPro = `SELECT * FROM subject ORDER BY id DESC LIMIT 0,4`
  // test
  route.get('/test', (req, res) => {
    getTest(getTestPro, res)
  })

  function getTest (getTestPro, res) {
    db.query(getTestPro, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).send('database err').end()
      } else {
        if (data.length === 0) {
          res.status(500).send('no datas').end()
                } else {
                    res.send(data)
                }
            }
        })
    }
    //
    route.get('/detail', (req, res) => {
        let produId = req.query.mId
        const imagesStr = `select image_url from product_image where product_id='${produId}'`
        const productStr = `select * from product where product_id='${produId}'`
        let detailDatas = []
        db.query(imagesStr, (err, imgDatas) => {
            if (err) {
                console.error(err)
                res.status(500).send('database err').end()
            } else {
                detailDatas.push(imgDatas)
                db.query(productStr, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database err').end()
                    } else {
                        detailDatas.push(data)
                        res.send(detailDatas)
                    }
                })
            }
        })

    })

    route.get('/search', (req, res) => {
        let keyWord = req.query.kw
        let hot = req.query.hot
        let priceUp = req.query.priceUp
        let priceDown = req.query.priceDown
        const keywordStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`
        const hotStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_comment_num desc`
        const priceUpStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`
        const priceDownStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`
        if (keyWord !== '') {
            if (hot !== '') {
                getSearchDatas(hotStr, res)
            } else if (priceUp !== '') {
                getSearchDatas(priceUpStr, res)
            } else if (priceDown !== '') {
                getSearchDatas(priceDownStr, res)
            } else {
                getSearchDatas(keywordStr, res)
            }
        }
    })
    /**
        get search datas
    */
    function getSearchDatas (keywordStr, res) {
        db.query(keywordStr, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length === 0) {
                    res.status(500).send('no datas').end()
                } else {
                    res.send(data)
                }
            }
        })
    }
    /*
     *user reg func
     */
    route.post('/reg', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
        }
        let regName = mObj.regName
        let regPhone = mObj.regPhone
        let regPwd = mObj.regPwd
        regPwd = common.md5(regPwd + common.MD5_SUFFXIE)
        const insUserInfo = `INSERT INTO user(username,phone,password) VALUES('${regName}','${regPhone}','${regPwd}')`
        delReg(insUserInfo, res)
    })
    /*
     *deal user register
     */
    function delReg (insUserInfo, res) {
        db.query(insUserInfo, (err) => {
            if (err) {
                console.error(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                res.send({ 'msg': '注册成功', 'status': 1 }).end()
            }
        })
    };
    route.post('/login', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
            console.log(mObj)
        }
        let phone = mObj.loginPhone
        let password = common.md5(mObj.loginPwd + common.MD5_SUFFXIE)
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM user where phone='${phone}'`
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end()
                } else {
                    let dataw = data[0]
                    // login sucess
                    console.log(password)
                    if (dataw.password == password) {
                        // save the session
                        req.session['id'] = dataw.user_id
                        dataw.msg = `登录成功`
                        dataw.status = 1
                        res.send(dataw).end()
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end()
                    }
                }
            }
        })
    })
    // userinfo
    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId
        const getU = `SELECT * FROM user where id='${uId}'`
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end()
                } else {
                    res.send(data[0])
                }
            }
        })
    })
    return route
}
