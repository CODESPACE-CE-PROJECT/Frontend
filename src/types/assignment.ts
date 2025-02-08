import { AssignmentType } from "../enum/enum"
import { AnnounceAssignmentType } from "../enum/enum"
import { StateSubmission } from "../enum/enum"


export type IAssignment = {
  assignment:
  {
    assignmentId: string,
    username: string,
    title: string,
    type: AssignmentType,
    isLock: true,
    startAt: Date,
    expireAt: Date,
    announceType: AnnounceAssignmentType,
    announceDate: Date,
    createdAt: Date,
    updatedAt: Date,
    courseId: string,
    problem: [
      {
        problemId: string,
        score: number,
        stateSubmission: StateSubmission
      }
    ],
    totalScore: number
  }[]

}
