import { Router } from "express";
import { MatchingSituation } from "../db/models";

class MatchingSituationService {
  constructor(model) {
    this.MatchingSituation = model;
  }
  async addParticipants(participantsInfo) {
    const { participantsId, matchingPostId } = participantsInfo;
    const insertData = { participantsId, matchingPostId };
    const participants = await MatchingSituation.create(insertData);

    return participants;
  }
}
const matchingSituationService = new MatchingSituationService(
  MatchingSituation
);

export { matchingSituationService };
