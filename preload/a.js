import axios from 'axios'
import { sleep } from '../src/utils'
axios.get('https://scrm.jianzhiweike.net/admin/common-permission/getPermissionByAcl').then(data => {
  console.info('data---------------------------')
  console.info(pick(data, 'data'))
})
sleep(3000).then(() => {
    console.info('---------------------------')
    console.info(import.meta.env)
})
