import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exceptions";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, {metatype} : ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object)
        if(Boolean(errors.length)) {
            const errorMessage = errors.map(err => `${err.property} - ${Object.values(err.constraints).join(", ")}`)
            throw new ValidationException(errorMessage)
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

}