import z, { templateLiteral } from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserDto = UserSchema.pick(//resuse schema
    {
        username : true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
    }
).extend( //add new attributes to schema
    {
        confirmPassword: z.string().min(6,'Confirm password is required'),
    }
).refine( //custom validation
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type CreateUserDto = z.infer<typeof CreateUserDto>; //automatically create type from schema

export const UpdateUserDto = UserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

//can use UserSchema or make a new schema
export const LoginUserDto = z.object({
    username : z.string().min(3,'Username is required'),
    password: z.string().min(6,'Password is required'),
});
export type LoginUserDto = z.infer<typeof LoginUserDto>;