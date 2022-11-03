export abstract class VAL {
  static ENTER = (val) => {
    return {
      message: val + 'is required',
      required: true
    }
  }
  static SELECT = (val) => {
    return {
      message: 'Please select ' + val,
      required: true
    }
  }
  static WHITE_SPACE = {
    message: 'White space not allowed',
    space: true
  }
  static MAX_CHAR = (val) => {
    return {
      message: 'Maximum ' + val + ' characters allowed',
      max: true
    }
  }
  static MIN_CHAR = (val) => {
    return {
      message: 'Minimum ' + val + ' characters allowed',
      min: true
    }
  }
  static NUM = {
    message: 'Only numbers allowed',
    num: true
  }
  static DECIMAL = {
    message: 'Only whole numbers allowed',
    decimal: true
  }
  static MIN = (val) => {
    return {
      message: 'Minimum digits ' + val + ' allowed',
      min: true
    }
  }
  static MAX = (val) => {
    return {
      message: 'Maximum digits ' + val + ' allowed',
      max: true
    }
  }
  static ALPHA = {
    message: 'Only alphabets allowed',
    alpha: true
  }
  static ALPHANUM = {
    message: 'Only alphabets and numbers allowed',
    alphaNum: true
  }
  static HYPHEN = {
    message: 'Hyphen not allowed at start and end',
    hyphen: true
  }
  static PATTERN = {
    message: 'Special characters not allowed',
    special: true
  }
}
