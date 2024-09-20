import { sleep } from '../src/utils'
sleep(3000).then(() => {
    console.info('---------------------------')
    console.info(import.meta.env)
})
