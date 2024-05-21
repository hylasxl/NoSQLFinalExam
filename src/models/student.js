import { Schema, model } from "mongoose"

const studentSchema = new Schema(
    {
        ten: {
            type: String,
        },
        tuoi: {
            type: Number,
        },
        gioitinh: {
            type: String,
        },
        diemToan: {
            type: Number,
        },
        diemLy: {
            type: Number,
        },
        diemHoa: {
            type: Number,
        }
    },
    {
        timestamps: true
    })

export default model('students', studentSchema)