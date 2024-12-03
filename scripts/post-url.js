'use strict';

hexo.extend.filter.register('before_post_render', function (data) {
    if (data.layout === 'post') {
        const moment = require('moment');
        const date = moment(data.date);
        data.copyright_author = 'houxiaozhao';
        data.copyright_author_href = 'https://github.com/houxiaozhao';
        data.copyright_url = `${hexo.config.url}/${date.format('YYYY/MM/DD')}/${data.slug}/`;
        data.copyright_info = '此文章版权归houxiaozhao所有，如有转载，请注明来自原作者';
    }
    return data;
});