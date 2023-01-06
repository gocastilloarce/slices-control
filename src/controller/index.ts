import {keyTap, keyToggle} from 'robotjs'

export const strokeRight = ()=>{
    keyTap("right")
}

export const strokeLeft = ()=>{
    keyTap("left")
}

export const startPresentation = ()=>{
    keyTap("f5","control")
}

export const stopPresentation = ()=>{
    keyTap("escape")
}