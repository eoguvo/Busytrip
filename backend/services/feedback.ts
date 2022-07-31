import FeedbackModel from '../database/models/feedback';
import UserModel from '../database/models/user';
import { IFeedback } from '../interfaces/feedback';

import { PipelineStage, Types } from 'mongoose';
export class FeedbackService {
  db;
  UserModel;
  pipeline: (id: string) => PipelineStage[];
  constructor() {
    this.db = FeedbackModel;
    this.UserModel = UserModel;
    const OBjectId = Types.ObjectId;
    this.pipeline = (id) => [
        {
            "$match": {
                "company_id": new OBjectId(id)
            }
        }, 
        {
            "$group": {
                "_id": null,
                "ratings": {
                    "$avg": "$ratings"
                }
            }
        }
    ];
  }

  async GetByCompanyId(company_id: string) {
    console.log(company_id)
    if (!company_id) throw new Error('Selecione um id');
    const result = await this.db.find({ company_id }).sort({ createdAt : -1 }).lean<IFeedback[]>();
    return result;
  }

  async Create(feedback: IFeedback) {
    const { _doc: data } = await this.db.create(feedback);

    const [{ ratings },] = await this.db.aggregate(
      this.pipeline(feedback.company_id),
      { allowDiskUse: false }
    );
    console.log(ratings)
    await this.UserModel.findOneAndUpdate({_id: feedback.company_id}, {ratings})

    return {
      data
    };
  }
}
