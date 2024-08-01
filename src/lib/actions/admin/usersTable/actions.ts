'use server'
import authApiRequest from "@/src/apiRequests/auth";
import { HttpError, EntityError } from "@/src/lib/httpAxios";
import { RegisterBodyType } from "@/src/schemaValidations/auth.schema";

export async function CreateUser(formData: FormData) {
    const registerForm: RegisterBodyType = {
        username: formData.get('username') as string,
        fullname: formData.get('fullname') as string,
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        phoneNumber: formData.get('phonenumber') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('password') as string,
    }
    try {
        // const result = await loginRequest(body);
        const result = await authApiRequest.register(registerForm);
        return { success: true };
    } catch (error: any) {

        if (error instanceof HttpError) {
            const errors = error?.payload
            if (error.status === 422) { 
                console.log(errors);
                return { success: false, errors };
            }
            return { success: false, error: 'An unexpected error occurred.' };
        }
    } finally {

    }
} 