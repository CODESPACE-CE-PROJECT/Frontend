export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export enum Role {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}

export enum AssignmentType {
    EXERCISE = "EXERCISE",
    EXAMONLINE = "EXAMONLINE",
    EXAMONSITE = "EXAMONSITE"
}

export enum LanguageType {
    PYTHON = "PYTHON",
    C = "C",
    CPP = "CPP",
    JAVA = "JAVA"
}

export enum AnnounceAssignmentType {
    UNSET = "UNSET",
    SET = "SET",
    ANNOUNCED = "ANNOUNCED"
}

export enum PackageType {
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}

export enum StateSubmission {
    PASS = "PASS",
    FAILED = "FAILED",
    NOTSEND = "NOTSEND"
}

export enum NotificationType {
    ACTION = "ACTION",
    GENERAL = "GENERAL",
    ANNOUNCE = "ANNOUNCE"
}

export enum ConstraintType {
    FUNCTION = "FUNCTION",
    METHOD = "METHOD",
    CLASS = "CLASS"
}

export enum NotifyType {
    SUCCESS,
    ERROR,
    WARNING,
    LOADING,
}

export enum ValidateType {
    NOTEXIST = 'NOTEXIST',
    EXIST = 'EXIST',
    DUPLICATE = 'DUPLICATE',
}