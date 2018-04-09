

a()
b()

function a(callback) {
  setTimeout(function () {
    // a的任务代码
    callback()
  }, 1000)
}
a(b)

function a() {
  setTimeout(function () {
    // a的任务代码
    a.trigger('done')
  }, 1000)
}
a.on('done', b)


jQuery.subscribe('done', b);
function a() {
  setTimeout(function () {
    // a的任务代码
    jQuery.publish('done')
  }, 1000)
}
jQuery.unsubscribe('done', b)


function a() {
  var dtd = $.Deferred()
  setTimeout(function() {
    // a的任务代码
    dtd.resolve()
  }, 1000)
  return dtd
}
a().then(b);
a().then(b).then(c);
a().then(b).fail(c)








