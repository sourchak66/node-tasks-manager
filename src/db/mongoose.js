import mongoose from "mongoose";

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL)
.then((result) =>
{
    console.log("Connected Successfully!!");
})
.catch((error) =>
{
    console.log("Unable to Connect!!", error);
});