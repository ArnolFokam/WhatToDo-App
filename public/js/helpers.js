window.helpers = (function () {
  function newTask(attrs = {}) {
    const task = {
      title: attrs.title || 'Task',
      content: attrs.content || 'content',
      id: uuid.v4(), // eslint-disable-line no-undef
      elapsed: 0,
    };

    return task;
  }

  function findById(array, id, cb) {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
  }

  function millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      pad(hours.toString(), 2),
      pad(minutes.toString(), 2),
      pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
  }

  function pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  return {
    millisecondsToHuman,
    newTask,
    findById
  };
}());
