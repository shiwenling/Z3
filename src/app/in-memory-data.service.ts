/**
 * Created by TP on 2017/7/27.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const systems = [
      {id: 0, sysname: 'dev', creatror: 'mydba', principal: 'aaa', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '1111', role: '开发', email: 'dev@enmotech.com',
        dbname: 'aaa', host: 'oel6idb', function: '开发'},
      {id: 1, sysname: 'dba', creatror: 'eeeeee', principal: 'bbb', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: 'rrrrrrr', role: '开发', email: 'dev@enmotech.com',
        dbname: 'dbbbt', host: 'oel6idb', function: '开发'},
      {id: 2, sysname: 'abc', creatror: 'zone', principal: 'deadvv', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: 'jrt54654656fg', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {id: 3, sysname: 'eee', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {id: 4, sysname: 'abc', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {id: 5, sysname: 'zzz', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ee', host: 'oel6idb', function: '开发'},
      {id: 6, sysname: 'ahr', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 7, sysname: 'abc', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 8, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '', role: '开发', email: 'dev@enmotech.com',
        dbname: 'eee', host: 'oel6idb', function: '开发'},
      {id: 9, sysname: 'dev', creatror: 'mydba', principal: 'bbb', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 10, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 11, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 12, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 13, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ffff', host: 'oel6idb', function: '开发'},
    ];
    const dbs = [
      {dbPk: 0,  comments: '1111', dbname: 'aaa', host: 'oel6idb', function: '开发'},
      {dbPk: 1,  comments: 'rrrrrrr',
        dbname: 'dbbbt', host: 'oel6idb', function: '开发'},
      {dbPk: 2, comments: 'jrt54654656fg',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {dbPk: 3,  comments: '',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {dbPk: 4,  comments: '--',
        dbname: 'ccc', host: 'oel6idb', function: '开发'},
      {dbPk: 5,  comments: '--',
        dbname: 'ee', host: 'oel6idb', function: '开发'},
      {dbPk: 6,  comments: '',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 7, comments: '',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 8, comments: '',
        dbname: 'eee', host: 'oel6idb', function: '开发'},
      {dbPk: 9,  comments: '--',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 10, comments: '--',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 11,  comments: '--',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 12,  comments: '--',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {dbPk: 13,  comments: '--',
        dbname: 'ffff', host: 'oel6idb', function: '开发'},

    ];
    const users = [
      {userId: 0, username: 'ddd',  role: '开发', email: 'dev@enmotech.com'},
      {userId: 1, username: 'dba', role: '开发', email: 'dev@enmotech.com'
       },
      {userId: 2, username: 'abc', role: '开发', email: 'dev@enmotech.com'
       },
      {userId: 3, username: 'eee', role: '开发', email: 'dev@enmotech.com'
       },
      {userId: 4, username: '333',  role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 5, username: '222',  role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 6, username: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 7, username: 'aaa', role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 8, username: 'bbb', role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 9, username: 'deadvv', role: '开发', email: 'dev@enmotech.com'
       },
      {userId: 10, username: 'dev', role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 11, username: 'dev',  role: '开发', email: 'dev@enmotech.com'
       },
      {userId: 12, username: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
      {userId: 13, username: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
    ];
    const modules = [
      {id: 33, sysname: 'DDLAUDIT2', modulename: 'DDLAUDIT2',principal: 'dev', comments: '--' },
      {id: 11, sysname: '0401', modulename: 'DDLAUDIT',principal: 'dev', comments: '--' },
      {id: 45, sysname: '0405', modulename: 'ZONE',principal: 'dev', comments: '--' },
      {id: 22, sysname: '111', modulename: 'MZ3',principal: 'dev', comments: '--' },
      {id: 23, sysname: 'DDL', modulename: 'LICENSE',principal: 'dev', comments: '--' },
      {id: 34, sysname: 'Z3', modulename: 'ZEN',principal: 'dev', comments: '--' },
      {id: 35, sysname: 'dev', modulename: 'DDL',principal: 'dev', comments: '--' },
      {id: 36, sysname: 'DDLAUDIT2', modulename: 'APP_test',principal: 'dev', comments: '--' },
      {id: 37, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 25, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 26, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 56, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 59, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 1, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 21, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 78, sysname: '111', modulename: 'asasas',principal: 'dev', comments: '--' },
    ];
    const schemas = [
      {dbPk: 33, dbname: 'DDLAUDIT2', schemaId:11, schema: 'ZONE',psdstate: '正常', function:'开发', comments: '--', tablename: 'Test' ,tablecomments: 'seeww'},
      {dbPk: 11, dbname: 'abc', schemaId:12,schema: 'Z3',psdstate: '正常',  function:'开发', comments: '--' , tablename:'Test' ,tablecomments: 'fgjiiih'},
      {dbPk: 45, dbname: 'fdfddf',schemaId:13, schema: 'SDSDSDS',psdstate: '正常',function:'开发', comments: '--' , tablename:'Test' ,tablecomments: ''},
      {dbPk: 22, dbname: 'DDLAUDIT2',schemaId:18, schema: 'ZONE',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test', tablecomments: 'gfgh'},
      {dbPk: 23, dbname: 'sddd',schemaId:21, schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test',tablecomments :'--'},
      {dbPk: 34, dbname: 'DDLAUDIT2', schemaId:1,schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 35, dbname: 'DDLAUdfdfdDIT2', schemaId:167,schema: 'fdfdfdf',psdstate: '正常', function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 33, dbname: 'zsdsdsds',schemaId:11, schema: 'ZONE',psdstate: '正常', function:'开发', comments: '--', tablename: 'Test',tablecomments :'--' },
      {dbPk: 11, dbname: 'aaaa', schemaId:11,schema: 'Z3',psdstate: '正常',  function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 45, dbname: 'aaa', schemaId:45,schema: 'dd3',psdstate: '正常',function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 22, dbname: 'abc', schemaId:11,schema: 'ZONE',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 23, dbname: 'bcd', schemaId:51,schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 34, dbname: 'cxcx',schemaId:41, schema: 'sfz',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 35, dbname: 'DDLAUDIT2', schemaId:10,schema: 'Z3',psdstate: '正常', function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 33, dbname: 'DDLAUDIT2', schemaId:19,schema: 'ZONE',psdstate: '正常', function:'开发', comments: '--', tablename: 'Test' ,tablecomments :'--'},
      {dbPk: 11, dbname: 'DDLAUDIT2', schemaId:110,schema: 'Z3',psdstate: '正常',  function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 45, dbname: 'DDLAUDIT2',schemaId:56, schema: 'ZONE',psdstate: '正常',function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 22, dbname: 'DDLAUDIT2', schemaId:22,schema: 'ZONE',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 23, dbname: 'DDLAUDIT2',schemaId:78, schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 34, dbname: 'DDLAUDIT2',schemaId:44, schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' ,tablecomments :'--'},
      {dbPk: 35, dbname: 'DDLAUDIT2',schemaId:88, schema: 'Z3',psdstate: '正常', function:'开发', comments: '--' , tablename:'Test' ,tablecomments :'--'}
    ];
    const coretables = [
      {id: 33, tablename: 'Test' ,tablecomments: 'seeww'},
      {id: 11, tablename:'Test' ,tablecomments: 'fgjiiih'},
      {id: 45, tablename:'Test' ,tablecomments: ''},
      {id: 22,  tablename:'Test', tablecomments: 'gfgh'},
      {id: 23,  tablename:'Test',tablecomments :''},
      {id: 34, tablename:'Test' ,tablecomments :'dffdf'},
      {id: 35, tablename:'Test' ,tablecomments :''},
      {id: 33,  tablename: 'Test',tablecomments :'--fsd' },
      {id: 11,  tablename:'Test' ,tablecomments :'sfsf'},
      {id: 45,  tablename:'Test' ,tablecomments :'nbvnbn'},
      {id: 22,  tablename:'Test' ,tablecomments :'vnv'},
      {id: 23,  tablename:'Test' ,tablecomments :'--'},
      {id: 34,  tablename:'Test' ,tablecomments :'--'},
      {id: 35,  tablename:'Test' ,tablecomments :'--'},
      {id: 33,  tablename: 'Test' ,tablecomments :'--'},
      {id: 11,  tablename:'Test' ,tablecomments :'--'},
      {id: 45,  tablename:'Test' ,tablecomments :'--'},
      {id: 22,  tablename:'Test' ,tablecomments :'--'},
      {id: 23,  tablename:'Test' ,tablecomments :'--'},
      {id: 34,  tablename:'Test' ,tablecomments :'--'},
      {id: 35, tablename:'Test' ,tablecomments :'--'}
    ];
    const projects = [
      {id: 10, projectname:'zen项目迁移', sysname: 'dev', moduleId:22, userId:57, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'冻结',members:'pusheng,swl,zone_dev,angular'},
      {id: 12, projectname:'ddd', sysname: 'ABC', moduleId:12, userId:58,  modulename:'Z3',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 14, projectname:'yr4', sysname: 'Z3', moduleId:32, userId:59,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 15, projectname:'dfdfd', sysname: 'Z3', moduleId:42, userId:34,  modulename:'Z3',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 16, projectname:'zen项目迁移', sysname: 'DDL', moduleId:52, userId:44,  modulename:'License',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 21, projectname:'gfgfg', sysname: 'dev',  moduleId:62, userId:43,  modulename:'License',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 23, projectname:'sss', sysname: 'dev',  moduleId:27, userId:74, modulename:'LICENSE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 26, projectname:'srg', sysname: 'Z3',  moduleId:28, userId:48, modulename:'ZEN',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 29, projectname:'fefe', sysname: 'dev',  moduleId:29, userId:49, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 33, projectname:'aaa', sysname: 'DDL', moduleId:20, userId:66,  modulename:'MZ3',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 45, projectname:'avd', sysname: 'abc', moduleId:27, userId:67,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 44, projectname:'dgt', sysname: 'dev', moduleId:24, userId:68,  modulename:'MZ3',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 46, projectname:'ase', sysname: 'abc', moduleId:23, userId:60,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 31, projectname:'zen项目迁移', sysname: 'abn', moduleId:32, userId:37,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 7, projectname:'aqdcf', sysname: 'dev', moduleId:33, userId:24,  modulename:'License',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 52, projectname:'zen项目迁移', sysname: 'dev',  moduleId:34, userId:36, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 42, projectname:'aaa', sysname: 'DDL', moduleId:35, userId:35,  modulename:'License',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 54, projectname:'aaa', sysname: 'dev',  moduleId:36, userId:34, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 71, projectname:'aaa', sysname: 'dev', moduleId:43, userId:33,  modulename:'License',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 77, projectname:'zen项目迁移', sysname: 'dev',  moduleId:44, userId:21, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 92, projectname:'zen项目迁移', sysname: 'dev',  moduleId:45, userId:22, modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 37, projectname:'zen项目迁移', sysname: 'dev', moduleId:56, userId:23,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'},
      {id: 49, projectname:'zen项目迁移', sysname: 'dev', moduleId:58, userId:24,  modulename:'ZONE',creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', state:'活动',members:'["pusheng","swl","zone_dev","angular"]'}

    ];
    const objects=[
      {id: 10, objectType:'序列', objectName: 'EMAIL_PROPRTIES', changeType:'新建',dataFunction: '', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '-xulie'},
      {id: 12, objectType:'序列', objectName: 'SQL_EMAIL', changeType:'新建',dataFunction: '', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '序列SQL'},
      {id: 14, objectType:'序列', objectName: 'DFHDIFHI', changeType:'新建',dataFunction: '', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: 'FIDHNIGIOJDI'},
      {id: 15, objectType:'序列', objectName: 'SQL_PROPRTIES', changeType:'变更',dataFunction: '', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '这是序列'},
      {id: 16, objectType:'序列', objectName: 'SQL_SSSSS', changeType:'新建',dataFunction: '', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: ''},
      {id: 21, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 23, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 26, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 29, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 33, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 45, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 44, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 46, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 31, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 7, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 52, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 42, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 54, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 71, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 77, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 92, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 37, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'},
      {id: 49, objectType:'表', objectName: 'EMAIL_PROPRTIES', changeType:'变更',dataFunction: '配置数据', changePeople: 'dev',
        gmtModified: '2016-12-30 10:38:14', comments: '--'}

    ];
    const tables = [
      {tableId: 11, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 12, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 13, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 14, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 15, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 16, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 17, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 18, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 19, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 20, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 21, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 22, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 23, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 24, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 25, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 26, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 27, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 28, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 29, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 30, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 31, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 32, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 33, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'},
      {tableId: 34, tableName: 'COLLECT_DROUPS', lockState: '未锁', changePeople: 'zone_dev',   gmtModified: '2016-12-30 10:38:14',gmtCreate: '2016-12-30 10:38:14',
        tablecoments: '主机监控项黑白名单关系备份表'}
    ];
    const sequences = [
      {sequenceId: 11, sequenceName: 'SQL_EMAIL', lockState: '未锁', minValue: '1',   maxValue: '--', step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: '序列SQL', selfGrowValue: 20},
      {sequenceId: 12, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 13, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 14, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 15, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 16, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 17, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 18, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 19, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 20, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 21, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 22, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 23, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 24, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 25, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 26, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 27, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 28, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 29, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 30, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 31, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 32, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 33, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20},
      {sequenceId: 34, sequenceName: 'SEQ_COLLECT', lockState: '未锁', minValue: '1',   maxValue: '--',step:'1', cacehValue:'20', cycle:'N', order:'N',
        tableNumber:'7',gmtCreate: '2016-12-30 10:38:14', sequencecomments: 'SNAP_sequenceId序列', selfGrowValue: 20}
    ];
    const tableinfos = [
      {id: 0, state: '', columnName: 'ID', dataType: 'NUMBER', columnLength: null, key: 'checked', allowNull: '', defaultValue: '', columnComments: 'PK'},
      {id: 1, state: '', columnName: 'GMT_CREATE', dataType: 'DATE', columnLength: null, key: '', allowNull: '', defaultValue: 'sysdate', columnComments: '创建时间'},
      {id: 2, state: '', columnName: 'GMT_MODIFIED', dataType: 'DATE', columnLength: null, key: '', allowNull: '', defaultValue: 'sysdate', columnComments: '修改时间'},
      {id: 3, state: '', columnName: 'CREATOR', dataType: 'VARCHAR2', columnLength: 32, key: '', allowNull: 'checked', defaultValue: '', columnComments: '创建人'},

    ];
    const columns = [
      {columnId: 0, state: '', columnName: 'ID', dataType: 'NUMBER', columnLength: null, key: 'checked', allowNull: '', defaultValue: '', columnComments: 'PK'},
      {colimnId: 1, state: '', columnName: 'GMT_CREATE', dataType: 'DATE', columnLength: null, key: '', allowNull: '', defaultValue: 'sysdate', columnComments: '创建时间'},
      {colimnId: 2, state: '', columnName: 'GMT_MODIFIED', dataType: 'DATE', columnLength: null, key: '', allowNull: '', defaultValue: 'sysdate', columnComments: '修改时间'},
      {colimnId: 3, state: '', columnName: 'CREATOR', dataType: 'VARCHAR2', columnLength: 32, key: '', allowNull: 'checked', defaultValue: '', columnComments: '创建人'},

    ];
    return {systems, dbs, users, modules, schemas,coretables, projects, objects, tables, sequences, tableinfos, columns};
  }
}
