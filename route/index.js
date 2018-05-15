const express = require('express')
const mysql = require('mysql')
const common = require('../libs/common')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'qizi'
})
module.exports = () => {

    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


    const route = express.Router()

    //首页轮播
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

    //专题列表
    route.get('/special', (req, res) => {
        const getSpecialList = `SELECT * FROM subject ORDER BY id DESC LIMIT 0,20`
        db.query(getSpecialList, (err, data) => {
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
    })    

    //分类列表
    route.get('/classifylist', (req, res) => {
        let tid = req.query.tid
        const classifylist = `select * from manga where type='${tid}'`
        db.query(classifylist, (err, data) => {
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
    })

    //漫画详情
    route.get('/mangadetail', (req, res) => {
        let mangaid = req.query.mangaid
        const mangaDetail = `select * from manga where id='${mangaid}'`
        db.query(mangaDetail, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length === 0)  {
                    res.status(500).send('no datas').end()
                } else {
                    res.send(data)
                }
            }
        })
    })

    //漫画章节列表
    route.get('/partlist', (req, res) => {
        let mangaid = req.query.mangaid
        const partList = `select * from part where mangaid='${mangaid}'`
        db.query(partList, (err, data) => {
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
    })

    //漫画章节列表
    route.get('/contentlist', (req, res) => {
        let partid = req.query.partid
        const partList = `select * from part where id='${partid}'`
        db.query(partList, (err, data) => {
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
    })

    //计划列表
    route.get('/projectList', (req, res) => {
        let mangaid = req.query.mangaid
        const projectList = `select manga.id as mangaid, manga.manganame, manga.mangapic, project.id, project.projecttitle
        from project
        left join manga
        on manga.id=project.mid1 or manga.id=project.mid2 or manga.id=project.mid3
        order by project.id`

        db.query(projectList, (err, data) => {
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
    })    

    //验证旧密码
    route.get('/checkpassword', (req, res) => {
        let userid = req.query.userid
        const getPassword = `SELECT password FROM user where id='${userid}'`
        db.query(getPassword, (err, data) => {
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

    //漫画评论列表
    route.get('/commentlist', (req, res) => {
        let mangaid = req.query.mangaid
        const commentList = `select comment.id, comment.commentcontent, comment.createtime, user.username, user.avatar
        from comment
        left join user
        on comment.userid=user.id
        where comment.mangaid='${mangaid}'
        order by comment.id`
        // const test = `SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
        // FROM Persons
        // LEFT JOIN Orders
        // ON Persons.Id_P=Orders.Id_P
        // ORDER BY Persons.LastName`
        db.query(commentList, (err, data) => {
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
    })

    //收藏列表
    route.get('/favorlist', (req, res) => {
        let userid = req.query.userid
        const favorList = `select favor.mangaid, manga.manganame, manga.mangapic, favor.id
        from manga
        left join favor
        on manga.id=favor.mangaid
        where favor.userid='${userid}'
        order by favor.id`
        // const test = `SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
        // FROM Persons
        // LEFT JOIN Orders
        // ON Persons.Id_P=Orders.Id_P
        // ORDER BY Persons.LastName`
        db.query(favorList, (err, data) => {
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
    })

    //专题详情
    route.get('/specialDetail', (req, res) => {
        let id = req.query.id
        const getU = `SELECT * FROM subject where id='${id}'`
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

    //浏览量
    route.get('/hit', (req, res) => {
        let mangaid = req.query.mangaid
        const manga =  `SELECT hit FROM manga where id='${mangaid}'`
        db.query(manga, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end()
                } else {
                    res.send(data)
                }
            }
        })
    })

    //浏览量加一
    route.get('/updatehit', (req, res) => {
        let mangaid = req.query.mangaid
        let mangahit = req.query.hit
        mangahit = parseInt(mangahit) + 1
        const upHit =  `UPDATE manga SET hit = '${mangahit}' WHERE id = '${mangaid}'`
        db.query(upHit, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end()
                } else {
                    res.send('success')
                }
            }
        })
    })

    //漫画榜单列表
    route.get('/ranklist', (req, res) => {
        const ranklist = `SELECT * FROM manga ORDER BY hit DESC LIMIT 0,30`
        db.query(ranklist, (err, data) => {
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
    })

    //评论漫画
    route.post('/postcomment', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
        }
        let mangaid = mObj.mangaid
        let userid = mObj.userid
        let comment = mObj.comment
        let time = new Date().format("yyyy-MM-dd")
        const insComment = `INSERT INTO comment(mangaid,userid,commentcontent,createtime) VALUES('${mangaid}','${userid}','${comment}','${time}')`
        db.query(insComment, (err) => {
            if (err) {
                console.error(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                res.send({ 'msg': '评论成功', 'status': 1 }).end()
            }
        })
    })

    //添加收藏
    route.post('/postcomment', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
        }
        let mangaid = mObj.mangaid
        let userid = mObj.userid
        let comment = mObj.comment
        let time = new Date().Format("yyyy-MM-dd")
        const insComment = `INSERT INTO comment(mangaid,userid,commentcontent,createtime) VALUES('${mangaid}','${userid}','${comment}','${time}')`
        db.query(insComment, (err) => {
            if (err) {
                console.error(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                res.send({ 'msg': '评论成功', 'status': 1 }).end()
            }
        })
    }) 
    
    //收藏图书
    route.post('/addfavor', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
        }
        let userid = mObj.userid
        let mangaid = mObj.mangaid
        const insFavor = `INSERT INTO favor(mangaid,userid) VALUES('${mangaid}','${userid}')`
        db.query(insFavor, (err) => {
            if (err) {
                console.error(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                res.send({ 'msg': '收藏成功', 'status': 1 }).end()
            }
        })
    }) 

    //取消收藏图书
    route.post('/concelfavor', (req, res) => {
        let mObj = {}
        for (let obj in req.body) {
            mObj = JSON.parse(obj)
        }
        let userid = mObj.userid
        let mangaid = mObj.mangaid
        const insFavor = `DELETE FROM favor WHERE  mangaid='${mangaid}' and userid='${userid}'`
        db.query(insFavor, (err) => {
            if (err) {
                console.error(err)
                res.send({ 'msg': '服务器出错', 'status': 0 }).end()
            } else {
                res.send({ 'msg': '取消收藏成功', 'status': 1 }).end()
            }
        })
    })

    //验证是否已收藏
    route.get('/checkfavor', (req, res) => {
        let userid = req.query.userid
        let mangaid = req.query.mangaid
        const searchList = `select * from favor where mangaid='${mangaid}' and userid='${userid}'`

        db.query(searchList, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '未收藏', 'status': 0 }).end
                } else {
                    res.send({ 'msg': '已收藏', 'status': 1 }).end
                }
            }
        })
    })


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


    //搜索列表
    route.get('/search', (req, res) => {
        let search = req.query.search
        const searchList = `select  *  from manga where manga.manganame like '%${search}%' or manga.author like '%${search}%'`

        db.query(searchList, (err, data) => {
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
    })  

    //修改密码
    route.get('/uploadpassword', (req, res) => {
        let password = req.query.password
        let userid = req.query.userid
        console.log(password)
        password = common.md5(password + common.MD5_SUFFXIE)
        const updatePassword =  `UPDATE user SET password='${password}' where id='${userid}'`
        db.query(updatePassword, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (err) {
                    console.error(err)
                    res.send({ 'msg': '服务器出错', 'status': 0 }).end()
                } else {
                    res.send({ 'msg': '修改成功', 'status': 1 }).end()
                }
            }
        })
    })

    //修改个人信息
    route.get('/updateuserinfo', (req, res) => {
        let userid = req.query.userid
        let username = req.query.username
        let gender = req.query.gender
        let info = req.query.info
        const updateUser =  `UPDATE user SET username='${username}',gender='${gender}',info='${info}'  where id='${userid}'`
        db.query(updateUser, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send('database err').end()
            } else {
                if (err) {
                    console.error(err)
                    res.send({ 'msg': '服务器出错', 'status': 0 }).end()
                } else {
                    res.send({ 'msg': '修改成功', 'status': 1 }).end()
                }
            }
        })
    })
    
    //用户注册
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

    //用户登陆
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
    // 用户详情
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
