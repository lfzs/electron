import { sleep } from '../src/utils'
import { pick } from 'lodash-es'
import Logo from '/logo.svg?raw'

sleep(3000).then(() => {
    console.info('---------------------------')
    console.info('hi')
    console.info('---------------------------')
    console.info(pick(import.meta.env, ['mode']))
    console.info('---------------------------')
    console.info(Logo)
})