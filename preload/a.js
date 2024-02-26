import { sleep } from '../src/utils'
import { pick } from 'lodash-es'
sleep(3000).then(() => {
    console.info('---------------------------')
    console.info(import.meta.env)
})
