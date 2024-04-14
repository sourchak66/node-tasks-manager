import("../src/db/mongoose.js");
import task from "../src/models/task.js";

const myTask = task.Task;

// myTask.findByIdAndDelete("661aef82daed6abb078ee66b")
// .then((task) =>
// {
//     console.log(task);
//     return myTask.countDocuments({ completed : false });
// })
// .then((result) =>
// {
//     console.log(result);
// })
// .catch((error) =>
// {
//     console.log(error);
// })

const deleteTaskAndCount = async (id) =>
{
    const task = await myTask.findByIdAndDelete(id);
    const count = await myTask.countDocuments({ completed : false });
    return { task : task, count : count };
}

deleteTaskAndCount("661bc1c37de1831633da9918")
.then((result) =>
{
    console.log(result);
})
.catch((error) =>
{
    console.log(error);
});