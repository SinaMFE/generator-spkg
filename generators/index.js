const generators = require('yeoman-generator')
const simpleFiles = {
  src: 'src',
  '.eslintrc.yml': '.eslintrc.yml',
  '.gitlab-ci.yml': '.gitlab-ci.yml',
  '.gitignore': '.gitignore',
  'marauder.config.js': 'marauder.config.js',
  'README.md': 'README.md',
  'yarn.lock': 'yarn.lock'
}
const tplFiles = {}

module.exports = generators.extend({
  initializing() {
    this.log(this._globalConfig.name)
    this.log('会替换当前文件夹下文件，请确认当前文件夹为空或都可替换')
    this.spawnCommandSync('git', [
      'clone',
      'https://github.com/SinaMFE/marauder-comp-template.git'
    ])
  },
  prompting: function() {
      return this.prompt([{
          name: 'name',
          message: '请输入组件名称，组件名称为@mfelibs/{组件名称}，\n 组件命名请参考http://wiki.intra.sina.com.cn\n/pages/viewpage.action?pageId=124420634\n',
          validate: function(input) {
              if (input.indexOf("@mfelibs") != 0) {
                  return ('必须添加@mfelibs域');
              } else return true;
          }
      }, {
          name: 'description',
          message: '组件描述,必须填写，请务必准确，\n同学们需要通过组件描述来识别该组件的功能\n',
          default: ''
      }, {
          name: 'version',
          message: 'Version',
          default: '0.0.1'
      }, {
          name: 'repository',
          message: '目前必须填写，并且需要首先将组件建立到https://gitlab.weibo.cn/SINA_MFE_COMPONENTS组下面',
          validate: function(input) {
              if (input.indexOf("SINA_MFE_COMPONENTS") < 0) {
                  return ('放在https://gitlab.weibo.cn/SINA_MFE_COMPONENTS组下面');
              } else return true;
          }
      }, {
          name: 'homepage',
          message: '暂时用来存放demo的外链地址，不必填'
      }, {
          name: 'authorName',
          message: 'Author name',
          store: true
      }, {
          name: 'authorEmail',
          message: 'Author email',
          store: true
      }]).then(function(answers) {
          this.description = answers.description;
          this.name = answers.name;
          this.authorName = answers.authorName;
          this.authorEmail = answers.authorEmail;
          this.version = answers.version;
          this.repository = answers.repository ;
          this.log('app name', answers.name);
          this.log('cool feature', answers.cool);
      }.bind(this));
  },

  writing() {
    var source
    var target
    // this.conflicter.force = false
    for (source in simpleFiles) {
      target = simpleFiles[source]
      this._copy(source, target)
    }

    for (source in tplFiles) {
      target = tplFiles[source]
      this._copyTpl(source, target)
    }
    this._copyPackagejson('package.json', 'package.json')
    this.conflicter.force = true
    this.fs.delete(this.destinationPath('marauder-comp-template/'))
  },

  conflicts() {
    // var path = this.destinationPath('package.json')
    // this.conflicter.collision(path)
  },

  install() {
    this.spawnCommandSync('git', ['init'])
    // this.yarnInstall(undefined, {
    //     registry: 'http://registry.cnpm.sina.com.cn/'
    // });
  },

  end() {
        this.log(
          "\
                                ,;'`    ,.                           \n\
                           ,   ';;;   ;;;`                           \n\
                         ,';  ';;', ,;;;:  `;;'                      \n\
                     `' `';;;;;;;;;;;;;;,,';;'`                      \n\
                     ;;.;;;;;;;;;;;;;;;;;;;;'`                       \n\
                    ;;;;;;;;.       .;;;;;;;;.                       \n\
                   .;;;;:     ,,       .;;;;;;                       \n\
                   ;;;;    ;#####@`     .;;;;'                       \n\
                  `';'`   ;#@#'###'     `;;;;:                       \n\
                   ';'    @'  ;##@;     ;;;;'                        \n\
                   .;;;   :#:'##@.     ';;;,                         \n\
                     ;;;:   :';.    ,';;;`                           \n\
                       `:;;';;;;;';;;,                               \n\
             :#@######@#.           `;#@#########     +@########@@.  \n\
          `#####@##@###@` +#@@##  .@#############@   .##@###@#####@, \n\
         ,@###'       ;+ .@###@.  ;###@;    +####@            +###@, \n\
         '######@#',     +####'  `@###'     +####`    .;#@@@+`@####  \n\
          @###########, `####@`  ####@.    .@###+  .@####@## ;###@:  \n\
            `,;+@#####; `####;  `#####     ;####, :####+     #####   \n\
       `@'`      ####@` '###@`  +###@,    `@####  @###@.   `+###@`   \n\
       ##############   +###.  `@####     :###@;  #############.     \n\
       `'#@######;`    `@##+   +###@`     @####    .+#####'.         \n\
                       .##@`                                         \n\
                       '##'                                          \n\
                       @#'                                           \n\
                       @#                                            \n\
                       #                                             \n\
    "
        )
  },

  _copyPackagejson(source, dest) {
    var json = this.fs.readJSON(
      this.destinationPath('marauder-comp-template/' + source)
    )
    json.name = this.name
    json.description = this.description
    json.name = this.name
    json.author = this.authorName + ' <' + this.authorEmail + '>'
    json.version = this.version
    json.repository = this.repository || ''
    this.fs.writeJSON(this.destinationPath(source), json)
  },

  _copyTpl(source, dest) {
    this.fs.copyTpl(
      this.destinationPath('marauder-comp-template/' + source),
      this.destinationPath(dest),
      this
    )
  },

  _copy(source, dest) {
    this.fs.copy(
      this.destinationPath('marauder-comp-template/' + source),
      this.destinationPath(dest)
    )
  }
})
