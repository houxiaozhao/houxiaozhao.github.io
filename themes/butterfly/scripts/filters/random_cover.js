/**
 * Butterfly
 * ramdom cover
 */

"use strict";

hexo.extend.filter.register("before_post_render", function (data) {
  const { config } = this;
  if (config.post_asset_folder) {
    const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/;
    const topImg = data.top_img;
    const cover = data.cover;
    if (topImg && topImg.indexOf("/") === -1 && imgTestReg.test(topImg)) data.top_img = data.path + topImg;
    if (cover && cover.indexOf("/") === -1) data.cover = data.path + cover;
  }

  if (data.cover === false) {
    data.randomcover = randomCover();
    return data;
  }

  data.cover = data.cover || randomCover();
  return data;
});

function randomCover() {
  const theme = hexo.theme.config;
  let cover;
  let num;
  const list = [
    "zy/zyxvqy.jpg",
    "5g/5gd6p9.jpg",
    "qz/qzdqvr.jpg",
    "1p/1p398w.jpg",
    "kx/kx98xd.jpg",
    "m3/m3d119.jpg",
    "gp/gp8pdq.jpg",
    "gp/gpjj9q.jpg",
    "7p/7p39gy.jpg",
    "yx/yxjegd.jpg",
    "zy/zy8xrg.jpg",
    "kx/kx9pg7.jpg",
    "85/853r11.jpg",
    "p9/p92mj3.jpg",
    "o5/o5d7k7.jpg",
    "vq/vqmrvl.jpg",
    "9d/9d6wg8.jpg",
    "2y/2ye18x.jpg",
    "zy/zym92v.jpg",
    "l8/l83o92.jpg",
    "vq/vqm813.jpg",
    "5g/5gwwd9.jpg",
    "vq/vqg5wp.jpg",
    "jx/jx88k5.jpg",
    "kx/kx9jpq.jpg",
    "gp/gpjj97.jpg",
    "ex/exojk8.jpg",
    "we/we8dv7.jpg",
    "7p/7p2399.jpg",
    "7p/7p2e2y.jpg",
    "jx/jx5xyw.jpg",
    "zy/zyxz9v.jpg",
    "x6/x6128o.jpg",
    "7p/7p35wv.jpg",
    "2y/2ykdvg.jpg",
    "kx/kx9o61.jpg",
    "5g/5gwvz5.jpg",
    "ex/exyw3o.jpg",
    "o5/o5dj1p.jpg",
    "d6/d6gqjj.jpg",
    "7p/7p3we9.jpg",
    "7p/7p66we.jpg",
    "7p/7p6619.jpg",
    "85/85xwzj.jpg",
    "m3/m3pvy8.jpg",
    "rr/rr7xjq.jpg",
    "yx/yxjqqd.jpg",
    "3l/3l9zj3.jpg",
    "gp/gpjexe.jpg",
    "p9/p92923.jpg",
    "we/weq8y7.jpg",
    "jx/jx5p65.jpg",
    "we/weyjpp.jpg",
    "rr/rr222w.jpg",
    "o5/o5dqq9.jpg",
    "l8/l8qm3l.jpg",
    "vq/vqmg9l.jpg",
    "l8/l8qy8l.jpg",
    "85/85xdw1.jpg",
    "rr/rrd721.jpg",
    "6d/6dqemx.jpg",
    "we/wey8vq.jpg",
    "d6/d6g1gl.jpg",
    "5g/5gwmd3.jpg",
    "ex/exo8ww.jpg",
    "p9/p9273e.jpg",
    "we/we81p6.jpg",
    "6d/6doodl.jpg",
    "x6/x619o3.jpg",
    "m3/m3dqj8.jpg",
    "m3/m3p2l8.jpg",
    "7p/7p6dzy.jpg",
    "gp/gpjo6e.jpg",
    "vq/vqml88.jpg",
    "kx/kxwk1d.jpg",
    "jx/jx35jq.jpg",
    "yx/yxmjvx.jpg",
    "qz/qz697r.jpg",
    "5g/5gd513.jpg",
    "9d/9d6g28.jpg",
    "jx/jx33mp.jpg",
    "vq/vqgzql.jpg",
    "jx/jx5ezq.jpg",
    "gp/gp78j3.jpg",
    "gp/gpjm3d.jpg",
    "85/853yj2.jpg",
    "6d/6dojy7.jpg",
    "vq/vqm7om.jpg",
    "d6/d6g8ej.jpg",
    "d6/d65eyl.jpg",
    "yx/yxjrwd.jpg",
    "yx/yxj2el.jpg",
    "ex/exy3ml.jpg",
    "85/853gz2.jpg",
    "jx/jx8w7w.jpg",
    "l8/l8q5mq.jpg",
    "zy/zyx9lw.jpg",
    "jx/jx5ro5.jpg",
    "kx/kx79w6.jpg",
    "yx/yxmm3g.jpg",
    "9d/9d5edd.jpg",
    "o5/o5de89.jpg",
    "85/85oxpy.jpg",
    "3l/3l9836.jpg",
    "6d/6dkg8w.jpg",
    "qz/qz6wqr.jpg",
    "1p/1p35kv.jpg",
    "yx/yxm65g.jpg",
    "jx/jx86pp.jpg",
    "p9/p9k25p.jpg",
    "l8/l8qmlp.jpg",
    "jx/jx5r6w.jpg",
    "m3/m3ppwy.jpg",
    "ex/exooer.jpg",
    "zy/zymzlg.jpg",
    "yx/yxmwyx.jpg",
    "m3/m3pex1.jpg",
    "rr/rrdgp1.jpg",
    "ex/exolek.jpg",
    "jx/jx8lzw.jpg",
    "we/wey567.jpg",
    "5g/5gd2d1.jpg",
    "o5/o5d1zm.jpg",
    "kx/kxwxz6.jpg",
    "x6/x61vml.jpg",
    "2y/2ye296.jpg",
    "l8/l8qqkq.jpg",
    "kx/kxw9o1.jpg",
    "p9/p9k9gm.jpg",
    "l8/l8m15q.jpg",
    "x6/x61lov.jpg",
    "vq/vq99gl.jpg",
    "we/weqo7x.jpg",
    "rr/rr7p2q.jpg",
    "2y/2y8kem.jpg",
    "d6/d65xxm.jpg",
    "5g/5gwm39.jpg",
    "gp/gp8293.jpg",
    "d6/d6g16l.jpg",
    "d6/d6g5ro.jpg",
    "p9/p98e7e.jpg",
    "d6/d65d5g.jpg",
    "x6/x6lw2d.jpg",
    "we/weyl5x.jpg",
    "85/85ox3j.jpg",
    "5g/5gdkw3.jpg",
    "vq/vqgp9l.jpg",
    "kx/kxwp96.jpg",
    "rr/rr2qwm.jpg",
    "m3/m3dq58.jpg",
    "jx/jx37jm.jpg",
    "2y/2yed86.jpg",
    "yx/yx8vjl.jpg",
    "9d/9d66yx.jpg",
    "kx/kx996m.jpg",
    "ex/exyo5o.jpg",
    "85/85xv2j.jpg",
    "l8/l8mlyy.jpg",
    "3l/3l9z69.jpg",
    "7p/7p3opv.jpg",
    "ex/exyrp8.jpg",
    "rr/rrd6gj.jpg",
    "85/85o67y.jpg",
    "9d/9d6zpx.jpg",
    "jx/jx5q6w.jpg",
    "gp/gp8xql.jpg",
    "x6/x61xdo.jpg",
    "6d/6dklr6.jpg",
    "p9/p98pej.jpg",
    "jx/jx811m.jpg",
    "we/we8wyq.jpg",
    "p9/p981rj.jpg",
    "vq/vqg28m.jpg",
    "1p/1pj2d1.jpg",
    "3l/3l9d9d.jpg",
    "7p/7p6wke.jpg",
    "zy/zy8yyo.jpg",
    "m3/m3pqp9.jpg",
    "rr/rr71wj.jpg",
    "rr/rrd7q1.jpg",
    "7p/7p6jp3.jpg",
    "jx/jx8owq.jpg",
    "gp/gpjxe7.jpg",
    "qz/qz6j1d.jpg",
    "gp/gp7mq3.jpg",
    "9d/9d6k88.jpg",
    "yx/yxjvw7.jpg",
    "qz/qzdpol.jpg",
    "m3/m3dje8.jpg",
    "vq/vq99xl.jpg",
    "l8/l8qwpy.jpg",
    "jx/jx5lp5.jpg",
    "o5/o53gpm.jpg",
    "l8/l832qr.jpg",
    "6d/6dqjdl.jpg",
    "o5/o5dm2m.jpg",
    "yx/yxm5ed.jpg",
    "gp/gpj1eq.jpg",
    "vq/vqmyq3.jpg",
    "jx/jx862p.jpg",
    "vq/vqgxw3.jpg",
    "d6/d6perg.jpg",
    "jx/jx5x7y.jpg",
    "9d/9d5o8w.jpg",
    "jx/jx57qm.jpg",
    "jx/jx8zyq.jpg",
    "l8/l8q9pr.jpg",
    "we/we8p1p.jpg",
    "x6/x61e7z.jpg",
    "yx/yxjmq7.jpg",
    "6d/6dq1w6.jpg",
    "2y/2ykkgx.jpg",
    "2y/2yke6g.jpg",
    "2y/2ykjxm.jpg",
    "gp/gp865d.jpg",
    "l8/l8m9or.jpg",
    "zy/zyxvwj.jpg",
    "7p/7p3993.jpg",
    "vq/vqgzzl.jpg",
    "6d/6dqmwl.jpg",
    "l8/l8m6rp.jpg",
    "jx/jx8egq.jpg",
    "2y/2y8zzx.jpg",
    "yx/yxjd3k.jpg",
    "gp/gp8lpd.jpg",
    "kx/kxwkd6.jpg",
    "7p/7p3g8y.jpg",
    "x6/x611ed.jpg",
    "7p/7p6gp9.jpg",
    "7p/7p2r6y.jpg",
    "jx/jx5pm5.jpg",
    "l8/l8mmdy.jpg",
    "yx/yxjy6l.jpg",
    "gp/gp8553.jpg",
    "5g/5gdjg5.jpg",
    "ex/exo2gr.jpg",
    "9d/9d6eyw.jpg",
    "m3/m3pw38.jpg",
    "p9/p92l6e.jpg",
    "9d/9dm55k.jpg",
    "ex/exor6o.jpg",
    "gp/gp88dq.jpg",
    "3l/3l925y.jpg",
    "d6/d6poom.jpg",
    "jx/jx357q.jpg",
    "rr/rr2j87.jpg",
    "rr/rr288w.jpg",
    "x6/x6l7vv.jpg",
    "jx/jx8gdq.jpg",
    "p9/p9kwgj.jpg",
    "l8/l8m9xp.jpg",
    "1p/1pjeo1.jpg",
    "zy/zyxe8j.jpg",
    "85/853eek.jpg",
    "85/85xjy1.jpg",
    "zy/zy8q9v.jpg",
    "gp/gp7v2e.jpg",
    "l8/l83k62.jpg",
    "p9/p92p6j.jpg",
    "d6/d6gjo3.jpg",
    "m3/m39qmk.jpg",
    "9d/9d5k5x.jpg",
    "kx/kx9rx7.jpg",
    "gp/gp8pmq.jpg",
    "ex/exyjxr.jpg",
    "2y/2y89my.jpg",
    "d6/d6g96l.jpg",
    "3l/3l9vo9.jpg",
    "yx/yxmrxk.jpg",
    "zy/zy8xmv.jpg",
    "kx/kx9527.jpg",
    "3l/3lkqky.jpg",
    "p9/p98vem.jpg",
    "yx/yxj3wd.jpg",
    "3l/3lkx73.jpg",
    "9d/9d5911.jpg",
    "85/8536e2.jpg",
    "5g/5gwek5.jpg",
    "85/85oylj.jpg",
    "qz/qzdov5.jpg",
    "m3/m3pk3y.jpg",
    "85/85xrpj.jpg",
    "2y/2ye67g.jpg",
    "5g/5gd7j7.jpg",
    "jx/jx8eem.jpg",
    "vq/vqmer8.jpg",
    "p9/p9kl33.jpg",
    "o5/o5dw3m.jpg",
    "rr/rr2gkq.jpg",
    "85/85xjpk.jpg",
    "we/weyj3x.jpg",
    "qz/qz6mrr.jpg",
    "gp/gp78ll.jpg",
    "vq/vqg9o8.jpg",
    "ex/exomxr.jpg",
    "vq/vqgqlp.jpg",
    "kx/kxwkom.jpg",
    "we/wey8q7.jpg",
    "1p/1pjyl1.jpg",
    "l8/l8m58y.jpg",
    "m3/m3pp11.jpg",
    "85/85orl2.jpg",
    "qz/qzdrzl.jpg",
    "kx/kxw1om.jpg",
    "ex/exyreo.jpg",
    "kx/kx9e61.jpg",
    "d6/d6pxlm.jpg",
    "9d/9d5xzw.jpg",
    "d6/d6g9wg.jpg",
    "85/85x121.jpg",
    "1p/1pjo5v.jpg",
    "2y/2yeydm.jpg",
    "qz/qz2d65.jpg",
    "ex/exy8kk.jpg",
    "2y/2y88r6.jpg",
    "p9/p92y93.jpg",
    "yx/yxjezk.jpg",
    "1p/1pjddg.jpg",
    "7p/7p2j33.jpg",
    "1p/1p3p1w.jpg",
    "rr/rr2yow.jpg",
    "9d/9d5mmk.jpg",
    "yx/yxmgjl.jpg",
    "1p/1p3op3.jpg",
    "m3/m3py8m.jpg",
    "6d/6doldq.jpg",
    "o5/o5x6gp.jpg",
    "85/8539jk.jpg",
    "9d/9d5wmx.jpg",
    "rr/rr282m.jpg",
    "6d/6dkk2w.jpg",
    "gp/gp88el.jpg",
    "6d/6dorxl.jpg",
    "l8/l8qzoy.jpg",
    "p9/p983e3.jpg",
    "we/we8xr7.jpg",
    "gp/gpjo87.jpg",
    "2y/2ykpdg.jpg",
    "yx/yxjppd.jpg",
    "l8/l8mvxq.jpg",
    "m3/m3d8gm.jpg",
    "6d/6dqd67.jpg",
    "yx/yx8q3g.jpg",
    "rr/rr2p6w.jpg",
    "jx/jx3ek5.jpg",
    "1p/1p3p63.jpg",
    "rr/rr7ldm.jpg",
    "3l/3l9ody.jpg",
    "2y/2ye3k9.jpg",
    "gp/gp8zoe.jpg",
    "m3/m3dvjy.jpg",
    "kx/kxwzp7.jpg",
    "3l/3lz3e9.jpg",
    "6d/6dkkg7.jpg",
    "p9/p98dye.jpg",
    "jx/jx8r75.jpg",
    "d6/d6pld3.jpg",
    "3l/3lkwwv.jpg",
    "d6/d652mm.jpg",
    "5g/5g7y85.jpg",
    "qz/qz655l.jpg",
    "p9/p9218m.jpg",
    "1p/1pjlyw.jpg",
    "vq/vqmml5.jpg",
    "rr/rr7ekm.jpg",
    "7p/7p6lq9.jpg",
    "9d/9dmmr1.jpg",
    "d6/d6gydo.jpg",
    "vq/vq95d8.jpg",
    "9d/9d5x5k.jpg",
    "jx/jx5zlp.jpg",
    "o5/o5x7ql.jpg",
    "gp/gpjk37.jpg",
    "d6/d6g36m.jpg",
    "rr/rr733w.jpg",
    "3l/3lkrqy.jpg",
    "7p/7p28pe.jpg",
    "jx/jx87m5.jpg",
    "x6/x6195o.jpg",
    "jx/jx8ko5.jpg",
    "p9/p922jm.jpg",
    "7p/7p6vxy.jpg",
    "jx/jx3lq5.jpg",
    "we/we8yxp.jpg",
    "6d/6dq26w.jpg",
    "9d/9d55j8.jpg",
    "2y/2ykk3g.jpg",
    "rr/rr7d2w.jpg",
    "d6/d65gdl.jpg",
    "ex/exyj3r.jpg",
    "kx/kxw3y1.jpg",
    "o5/o5xex7.jpg",
    "rr/rrdqem.jpg",
    "kx/kx3my1.jpg",
    "p9/p98pkp.jpg",
    "qz/qzdxd5.jpg",
    "l8/l8q56p.jpg",
    "yx/yx8vjk.jpg",
    "m3/m3drxy.jpg",
    "85/85xxgj.jpg",
    "yx/yxj2o7.jpg",
    "6d/6dowqx.jpg",
    "3l/3lk2ed.jpg",
    "ex/exoe7o.jpg",
    "ex/ex7orl.jpg",
    "85/85oxlo.jpg",
    "rr/rr7ddw.jpg",
    "qz/qz67vd.jpg",
    "m3/m39pp9.jpg",
    "3l/3lk7o3.jpg",
    "jx/jx8oqm.jpg",
    "1p/1pjeg3.jpg",
    "x6/x6ly8o.jpg",
    "rr/rr2mzj.jpg",
    "qz/qzdxrq.jpg",
    "7p/7p35v3.jpg",
    "7p/7p22vv.jpg",
    "5g/5g7ew7.jpg",
    "5g/5gw751.jpg",
    "9d/9dm56w.jpg",
    "we/we87vx.jpg",
    "p9/p9k793.jpg",
    "5g/5gdj53.jpg",
    "9d/9d6x5k.jpg",
    "yx/yx8mrk.jpg",
    "ex/exygjw.jpg",
    "6d/6dk7q7.jpg",
    "zy/zymexj.jpg",
    "yx/yxmdqx.jpg",
    "7p/7p3vy9.jpg",
    "we/weqyyr.jpg",
    "5g/5gd1k7.jpg",
    "zy/zy8ydj.jpg",
    "6d/6dqq2w.jpg",
    "yx/yxje6g.jpg",
    "85/85o6wj.jpg",
    "kx/kxwzm7.jpg",
    "9d/9d51p8.jpg",
    "kx/kx7wo1.jpg",
    "9d/9d596d.jpg",
    "l8/l8338q.jpg",
    "ex/exoo8w.jpg",
    "o5/o53v3m.jpg",
    "d6/d6px7o.jpg",
    "gp/gp8637.jpg",
    "d6/d6gxlo.jpg",
    "we/we8lzq.jpg",
    "l8/l8q95p.jpg",
    "p9/p92eom.jpg",
    "qz/qz6kld.jpg",
    "we/weywvr.jpg",
    "jx/jx5yq5.jpg",
    "vq/vqg75p.jpg",
    "rr/rr739q.jpg",
    "gp/gp85d7.jpg",
    "p9/p9komm.jpg",
    "ex/exyxx8.jpg",
    "we/weyz9r.jpg",
    "5g/5gdw85.jpg",
    "l8/l839zy.jpg",
    "gp/gp7zre.jpg",
    "qz/qz2j5q.jpg",
    "m3/m3dm1k.jpg",
    "ex/exyzmo.jpg",
    "85/853e5k.jpg",
    "we/weqm37.jpg",
    "3l/3l97m9.jpg",
    "gp/gp8lpl.jpg",
    "vq/vq9ddl.jpg",
    "85/85xejj.jpg",
    "we/we8xoq.jpg",
    "p9/p93rpe.jpg",
    "l8/l8mrgl.jpg",
    "x6/x689m3.jpg",
    "yx/yxmjpk.jpg",
    "5g/5gwyk1.jpg",
    "yx/yxj3p7.jpg",
    "qz/qz6235.jpg",
    "5g/5gwxx9.jpg",
    "5g/5gwg37.jpg",
    "x6/x6lwjl.jpg",
    "2y/2ykeog.jpg",
    "o5/o5x9pp.jpg",
    "zy/zyxvgw.jpg",
    "85/85x29y.jpg",
    "9d/9dx3q8.jpg",
    "jx/jx5rrm.jpg",
    "o5/o5d7rl.jpg",
    "p9/p92d9m.jpg",
    "kx/kx9r56.jpg",
    "l8/l8qvrl.jpg",
    "3l/3l9r5v.jpg",
    "kx/kxwy96.jpg",
    "vq/vqg1z5.jpg",
    "vq/vqmqy8.jpg",
    "o5/o5x1p7.jpg",
    "l8/l8mpz2.jpg",
    "jx/jx59mp.jpg",
    "x6/x6l6k3.jpg",
    "vq/vqm9m3.jpg",
    "gp/gp8z6l.jpg",
    "5g/5gd1x8.jpg",
    "gp/gpjxwl.jpg",
    "2y/2y8l99.jpg",
    "vq/vqmqrm.jpg",
    "3l/3lkdpy.jpg",
    "1p/1pj25v.jpg",
    "5g/5g78p9.jpg",
    "7p/7p6glo.jpg",
    "o5/o5xkyl.jpg",
    "yx/yxjk67.jpg",
    "kx/kxwk6q.jpg",
    "l8/l8mwoy.jpg",
    "3l/3l965v.jpg",
    "l8/l8qdvq.jpg",
    "l8/l8my2q.jpg",
    "gp/gpjyml.jpg",
    "gp/gp8zee.jpg",
    "gp/gp7zvd.jpg",
    "yx/yx87qx.jpg",
    "gp/gpjyvl.jpg",
    "ex/exyrwo.jpg",
    "l8/l8mwjq.jpg",
    "3l/3l93ky.jpg",
    "p9/p98my3.jpg",
    "7p/7p6krv.jpg",
    "9d/9d685d.jpg",
    "l8/l83o6q.jpg",
    "yx/yxmo5k.jpg",
    "vq/vqmo1m.jpg",
    "vq/vqg2l8.jpg",
    "5g/5g7ww9.jpg",
    "l8/l8qw2l.jpg",
    "we/wey99r.jpg",
    "jx/jx8xv5.jpg",
    "l8/l8mo5q.jpg",
    "rr/rrdom7.jpg",
    "7p/7p23kv.jpg",
    "x6/x681vl.jpg",
    "d6/d6g79j.jpg",
    "9d/9d5gpw.jpg",
    "5g/5gdxq8.jpg",
    "5g/5gwgo5.jpg",
    "gp/gp7ydl.jpg",
    "o5/o5dqxl.jpg",
    "qz/qz2j2l.jpg",
    "7p/7p3vd9.jpg",
    "vq/vqgwg8.jpg",
    "ex/exyr1w.jpg",
    "rr/rrdxvm.jpg",
    "jx/jx5j6w.jpg",
    "o5/o5dg9p.jpg",
    "p9/p981m3.jpg",
    "3l/3lkjgy.jpg",
    "l8/l8m3kq.jpg",
    "x6/x6l1rl.jpg",
    "we/weqmo6.jpg",
    "85/85xg5k.jpg",
    "kx/kxwxjq.jpg",
    "vq/vq9eyl.jpg",
    "we/weqxlr.jpg",
    "d6/d6pqdo.jpg",
    "zy/zyxzgg.jpg",
    "jx/jx56vy.jpg",
    "ex/exyyz8.jpg",
    "9d/9d6vrd.jpg",
    "m3/m39p78.jpg",
    "9d/9d5g88.jpg",
    "l8/l8m9jy.jpg",
    "2y/2ye9jm.jpg",
    "yx/yxjpj7.jpg",
    "9d/9d6w1w.jpg",
    "we/weyeer.jpg",
    "yx/yxmx7l.jpg",
    "vq/vqmwk3.jpg",
    "o5/o5d18l.jpg",
    "85/85o17y.jpg",
    "3l/3l9ov6.jpg",
    "jx/jx3gxy.jpg",
    "jx/jx8815.jpg",
    "d6/d65xj3.jpg",
    "zy/zyxkpj.jpg",
    "d6/d65z1j.jpg",
    "5g/5gwvl7.jpg",
    "gp/gp71rd.jpg",
    "m3/m3dv7y.jpg",
    "d6/d6gpkj.jpg",
    "p9/p92ex3.jpg",
    "5g/5gdoy5.jpg",
    "kx/kx9ozm.jpg",
    "l8/l8qe6p.jpg",
    "9d/9d56mk.jpg",
    "kx/kx939d.jpg",
    "d6/d6g3l3.jpg",
    "ex/exow8o.jpg",
    "3l/3l9zwd.jpg",
    "d6/d6gwzl.jpg",
    "gp/gp7573.jpg",
    "2y/2yee5y.jpg",
    "2y/2yexgg.jpg",
    "ex/exo53l.jpg",
    "qz/qz23o5.jpg",
    "3l/3lkr6v.jpg",
    "5g/5gdv11.jpg",
    "6d/6dok66.jpg",
    "qz/qz26dl.jpg",
    "5g/5gdql7.jpg",
    "1p/1pk1kg.jpg",
    "x6/x61qvz.jpg",
    "p9/p9k6ye.jpg",
    "p9/p9kk7m.jpg",
    "p9/p982oj.jpg",
    "qz/qzdd1r.jpg",
    "p9/p92mke.jpg",
    "2y/2yeg59.jpg",
    "jx/jx8k6q.jpg",
    "gp/gp71d3.jpg",
    "qz/qzd22l.jpg",
    "x6/x61eqv.jpg",
    "9d/9d66r1.jpg",
    "kx/kx9z1d.jpg",
    "d6/d65dyj.jpg",
    "yx/yxmedg.jpg",
    "kx/kx77p1.jpg",
    "1p/1pjqj1.jpg",
    "gp/gp81qe.jpg",
    "3l/3lkjmd.jpg",
    "1p/1p3x31.jpg",
    "vq/vq9pw5.jpg",
    "jx/jx85xm.jpg",
    "ex/exyogk.jpg",
    "rr/rr2m71.jpg",
    "zy/zymyzv.jpg",
    "we/weql37.jpg",
    "o5/o5xpg7.jpg",
    "we/weyy57.jpg",
    "ex/ex7oyw.jpg",
    "zy/zyxp7w.jpg",
    "x6/x68klv.jpg",
    "3l/3lk2o3.jpg",
    "yx/yxmp5g.jpg",
    "9d/9dmy6x.jpg",
    "p9/p98vy3.jpg",
    "ex/exo1kw.jpg",
    "ex/exo19k.jpg",
    "7p/7p22j9.jpg",
    "zy/zyxzww.jpg",
    "o5/o5dwzl.jpg",
  ];
  if (theme.cover && theme.cover.default_cover) {
    return `https://th.wallhaven.cc/lg/${list[parseInt(Math.random() * list.length, 10) + 1]}`;
    // return `https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/pixiv/image-${parseInt(Math.random() * 617, 10) + 1}.jpg`;
    // if (!Array.isArray(theme.cover.default_cover)) {
    //     cover = theme.cover.default_cover
    //     return cover
    // } else {
    //     num = Math.floor(Math.random() * theme.cover.default_cover.length)
    //     cover = theme.cover.default_cover[num]
    //     return cover + '?time=' + Math.random()
    // }
  } else {
    cover = theme.default_top_img || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    return cover;
  }
}
