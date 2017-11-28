var generators = require('yeoman-generator');
module.exports = generators.Base.extend({
    prompting: function() {
        return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: "mfelibs@" + this.appname // Default to current folder name
                    ,
                validate: function(input) {
                    var done = this.async();
                    setTimeout(function() {
                        if (input.indexOf("mfelibs@") != 0) {
                            done('必须添加mfelibs@域');
                            return;
                        }
                        done(null, true);
                    }, 1);
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'description of this cname package',
                default: "" // Default to current folder name
            }, {
                type: 'input',
                name: 'author',
                message: '请输入作者 eg:fengwan <fengwan@staff.sina.com.cn>',
                default: "" //看看能不能取到当前cname的user
            }
            // , {
            //     type: 'confirm',
            //     name: 'cool',
            //     message: 'Would you like to enable the Cool feature?'
            // }
        ]).then(function(answers) {
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
        }.bind(this));
    }
})