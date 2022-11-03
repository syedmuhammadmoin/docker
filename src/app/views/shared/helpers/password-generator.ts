export class PasswordGenerator {

    static specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
    static lowercase = 'abcdefghijklmnopqrstuvwxyz';
    static uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static numbers = '0123456789';
    static all = PasswordGenerator.specials + PasswordGenerator.lowercase + PasswordGenerator.uppercase + PasswordGenerator.numbers;
  
  
    public static generatePassword(): string {
      return this.shuffle(
        this.pick(this.specials, 1)
        + this.pick(this.numbers, 1)
        + this.pick(this.lowercase, 1)
        + this.pick(this.uppercase, 1)
        + this.pick(this.all, 8, 10)
      );
    }
  
    static pick(str, min, max?) {
      let n, chars = '';
  
      if (typeof max === 'undefined') {
        n = min;
      } else {
        n = min + Math.floor(Math.random() * (max - min));
      }
  
      for (let i = 0; i < n; i++) {
        chars += str.charAt(Math.floor(Math.random() * str.length));
      }
  
      return chars;
    }
  
  
    static shuffle(str) {
      const array = str.split('');
      let tmp, current, top = array.length;
  
      if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
  
      return array.join('');
    }
  
  }
  
  
  
  