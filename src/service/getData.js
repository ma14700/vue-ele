import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

export const cityGuess = ()=>fetch('api/v1/cities',{
    type:'guess'
});