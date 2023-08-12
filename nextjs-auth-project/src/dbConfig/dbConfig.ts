import mongoose from 'mongoose';

export async function dbConnect() { 
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })
        connection.on('error', (error) => { 
            console.log('MongoDB connection error')
            console.log(error)
            process.exit();
        })
    } catch (error) { 
        console.log("something goes wrong")
        console.log(error)
    }
}