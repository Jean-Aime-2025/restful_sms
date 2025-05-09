import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(/^\+250\d{9}$/, {
    message:
      'Mobile number must start with "+250" and have 9 digits after that.',
  })
  readonly telephone: string;
  @IsEnum(Gender, {
    message: 'Gender must be one of: MALE, FEMALE, OTHER',
  })
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
    message:
      'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
  })
  readonly password: string;
}

export class UpdateUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(/^\+250\d{9}$/, {
    message:
      'Mobile number must start with "+250" and have 9 digits after that.',
  })
  readonly telephone: string;

  @IsEnum(Gender, {
    message: 'Gender must be one of: MALE, FEMALE, OTHER',
  })
  @IsNotEmpty()
  gender: Gender;
}

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
    message:
      'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
  })
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
    message:
      'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
  })
  readonly newPassword: string;
}

export class UpdateAvatarDTO {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
