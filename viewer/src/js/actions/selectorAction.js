export function changeUpdate() {
  return {
    type: "FORCED_UPDATE",
  }    
} 
export function changeNotUpdate() {
  return {
    type: "FORCED_NOT_UPDATE",
  }    
}
export function changeText(value) {
  return {
    type: "CHANGE_SEARCH_TEXT",
    payload: value
  }    
}
export function changeMode(mode) {
  return {
    type: "CHANGE_SEARCH_MODE",
    payload: mode
  }    
}
export function changeDiff(diff) {
  return {
    type: "CHANGE_SEARCH_DIFF",
    payload: diff
  }    
}
export function changePrediff(diff) {
  return {
    type: "CHANGE_SEARCH_PREDIFF",
    payload: diff
  }    
}
export function changeLoadingStat(bool) {
  return {
    type: "CHANGE_LOADING_STAT",
    payload: bool
  }
}
