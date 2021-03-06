let integer;
let userRead;
let userWrite;
let userExecute;
let groupRead;
let groupWrite;
let groupExecute;
let otherRead;
let otherWrite;
let otherExecute;

window.addEventListener('DOMContentLoaded', _ => {
  integer = document.getElementById('integer');
  userRead = document.getElementById('user-read');
  userWrite = document.getElementById('user-write');
  userExecute = document.getElementById('user-execute');
  groupRead = document.getElementById('group-read');
  groupWrite = document.getElementById('group-write');
  groupExecute = document.getElementById('group-execute');
  otherRead = document.getElementById('other-read');
  otherWrite = document.getElementById('other-write');
  otherExecute = document.getElementById('other-execute');

  integer.addEventListener('input', _ => {
    if (integer.value.match(/^[0-7]{3}$/)) {
      integer.classList.remove('error');
      resetPermissions();
      calculatePermissions();
    } else {
      integer.classList.add('error');
    }
  });

  userRead.addEventListener('change', calculateInteger);
  userWrite.addEventListener('change', calculateInteger);
  userExecute.addEventListener('change', calculateInteger);
  groupRead.addEventListener('change', calculateInteger);
  groupWrite.addEventListener('change', calculateInteger);
  groupExecute.addEventListener('change', calculateInteger);
  otherRead.addEventListener('change', calculateInteger);
  otherWrite.addEventListener('change', calculateInteger);
  otherExecute.addEventListener('change', calculateInteger);
});

function resetPermissions() {
  userRead.checked = false;
  userWrite.checked = false;
  userExecute.checked = false;
  groupRead.checked = false;
  groupWrite.checked = false;
  groupExecute.checked = false;
  otherRead.checked = false;
  otherWrite.checked = false;
  otherExecute.checked = false;
}

function calculatePermissions() {
  setPermissions(parseInt(integer.value[0]), { read: userRead, write: userWrite, execute: userExecute });
  setPermissions(parseInt(integer.value[1]), { read: groupRead, write: groupWrite, execute: groupExecute });
  setPermissions(parseInt(integer.value[2]), { read: otherRead, write: otherWrite, execute: otherExecute });
}

function setPermissions(digit, { read, write, execute }) {
  if (digit - 4 >= 0) {
    digit -= 4;
    read.checked = true;
  }

  if (digit - 2 >= 0) {
    digit -= 2;
    write.checked = true;
  }

  if (digit - 1 >= 0) {
    execute.checked = true;
  }
}

function calculateInteger() {
  let integerValue = 1000;

  if (userRead.checked) {
    integerValue += 400;
  }
  if (userWrite.checked) {
    integerValue += 200;
  }
  if (userExecute.checked) {
    integerValue += 100;
  }

  if (groupRead.checked) {
    integerValue += 40;
  }
  if (groupWrite.checked) {
    integerValue += 20;
  }
  if (groupExecute.checked) {
    integerValue += 10;
  }

  if (otherRead.checked) {
    integerValue += 4;
  }
  if (otherWrite.checked) {
    integerValue += 2;
  }
  if (otherExecute.checked) {
    integerValue += 1;
  }

  integer.value = integerValue.toString().substring(1);
}
