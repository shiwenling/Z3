/**
 * Created by TP on 2017/7/27.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const systems = [
      {id: 0, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 1, sysname: 'dba', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 2, sysname: 'abc', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 3, sysname: 'eee', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 4, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 5, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 6, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 7, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 8, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
        gmtModified: '2016-12-30 10:38:14', comments: '--', role: '开发', email: 'dev@enmotech.com',
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
      {id: 9, sysname: 'dev', creatror: 'mydba', principal: 'dev', gmtCreate: '2016-12-30 10:38:14',
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
        dbname: 'ddltest', host: 'oel6idb', function: '开发'},
    ];
    const users = [
      {id: 0, name: 'ddd',  role: '开发', email: 'dev@enmotech.com'},
      {id: 1, name: 'dba', role: '开发', email: 'dev@enmotech.com'
       },
      {id: 2, name: 'abc', role: '开发', email: 'dev@enmotech.com'
       },
      {id: 3, name: 'eee', role: '开发', email: 'dev@enmotech.com'
       },
      {id: 4, name: '333',  role: '开发', email: 'dev@enmotech.com'
        },
      {id: 5, name: '222',  role: '开发', email: 'dev@enmotech.com'
        },
      {id: 6, name: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
      {id: 7, name: 'dev', role: '开发', email: 'dev@enmotech.com'
        },
      {id: 8, name: 'dev', role: '开发', email: 'dev@enmotech.com'
        },
      {id: 9, name: 'dev', role: '开发', email: 'dev@enmotech.com'
       },
      {id: 10, name: 'dev', role: '开发', email: 'dev@enmotech.com'
        },
      {id: 11, name: 'dev',  role: '开发', email: 'dev@enmotech.com'
       },
      {id: 12, name: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
      {id: 13, name: 'dev',  role: '开发', email: 'dev@enmotech.com'
        },
    ];
    const modules = [
      {id: 33, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 11, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 45, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 22, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 23, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 34, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 35, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 36, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 37, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 25, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 26, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 56, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 59, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 1, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 21, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
      {id: 78, sysname: 'DDLAUDIT2', modulename: 'dev',principal: 'dev', comments: '--' },
    ];
    const schematables = [
      {id: 33, dbname: 'DDLAUDIT2', schema: 'ZONE',psdstate: '正常', function:'开发', comments: '--', tablename: 'Test' },
      {id: 11, dbname: 'DDLAUDIT2', schema: 'Z3',psdstate: '正常',  function:'开发', comments: '--' , tablename:'Test' },
      {id: 45, dbname: 'DDLAUDIT2', schema: 'ZONE',psdstate: '正常',function:'开发', comments: '--' , tablename:'Test' },
      {id: 22, dbname: 'DDLAUDIT2', schema: 'ZONE',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' },
      {id: 23, dbname: 'DDLAUDIT2', schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' },
      {id: 34, dbname: 'DDLAUDIT2', schema: 'Z3',psdstate: '正常', function:'开发',comments: '--' , tablename:'Test' },
      {id: 35, dbname: 'DDLAUDIT2', schema: 'Z3',psdstate: '正常', function:'开发', comments: '--' , tablename:'Test' }
    ];
    return {systems, users, modules, schematables};
  }
}
