const tasks = [];
let promise;
let done;
let taskId;
// let updateFrame = function (x) {
//   return 0;
// };
// if (typeof requestAnimationFrame === 'function') {
//   updateFrame = requestAnimationFrame;
// }
export function nextAnimationFrame() {
    //   if (!promise) {
    //     // If we haven't used a promise, this frame, create one.
    //     promise = new Promise((resolve) => {
    //       done = resolve;
    //     });
    //   }
    //if (!taskId) {
    // For consistency, simply asking for the nextAnimationFrame schedules
    // a tick if one isn't already scheduled.
    //taskId =
    updateAll();
    // }
    //return promise;
}
export function tick(task) {
    if (tasks.indexOf(task) === -1) {
        // If this task isn't already in the list, add it.
        tasks.push(task);
    }
    //if (!taskId) {
    // If a tick isn't scheduled, schedule it.
    //taskId =
    //updateAll();
    //}
}
function updateAll() {
    // Grab the current time so we can consistently provide a frame time to all
    // animations if they need a time.
    const tick = performance.now();
    for (let i = 0; i < tasks.length; i++) {
        // Call the update function. Functions that return truthy stay in queue.
        const stayInQueue = tasks[i](tick);
        if (!stayInQueue) {
            // Remove update functions that returned falsey values.
            tasks.splice(i, 1);
            i--;
        }
    }
    // If there are any tasks in queue, schedule next frame.
    //taskId = tasks.length ? updateFrame(updateAll) : 0;
    //   if (done) {
    //     // If nextAnimationFrame() was called, resolve the promise to notify
    //     // all interested parties. We have to store the done call in a local
    //     // variable in case the code executed by then wants to reschedule another
    //     // event. In that case, we need a new promise, so we have to store it,
    //     // unassign it, and then resolve it.
    //     const done2 = done;
    //     done = 0;
    //     promise = 0;
    //     done2();
    //   }
}
//# sourceMappingURL=tick.js.map