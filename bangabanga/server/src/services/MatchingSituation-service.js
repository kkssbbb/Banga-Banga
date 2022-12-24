import { Router } from "express";
import { MatchingSituation } from "../db/models";
import { MatchingPosts } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
class MatchingSituationService {
  constructor(model) {
    this.MatchingSituation = model;
  }
  async addParticipants(participantsInfo) {
    const { participantsId, matchingPostsId } = participantsInfo;
    const insertData = { participantsId, matchingPostsId };
    const participants = await MatchingSituation.create(insertData);

    return participants;
  }
  //내가 참여한 모집글 정보 조회(아직 모집 중인 게시물 포함 검색)
  async getMyPostInfo(userId) {
    const query = `select * from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId
      where A.participantsID = ${userId} and A.isFinish =0`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //각 모집글 참여자 정보
  async getPostInfo(matchingPostsId) {
    const query = `select * from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId
      where A.matchingPostsId = ${matchingPostsId}`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //나의 매칭 횟수()
  async getMyPostCount(userId) {
    const query = `select count(A.participantsId) as myMatchingCount from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId
      where A.participantsID = ${userId} and A.isFinish =0`; //A.isFinish가 1이 되어야 매칭완료 처리

    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //내가 참여한 게임 팀원 조회(본인을 제외하고 검색해야함)
  async getMyTeamInfo(participantsInfo) {
    const { userId, matchingPostsId } = participantsInfo;
    const query = `select A.participantsId from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId
      where A.participantsId not in ${userId} and A.matchingPostsId = ${matchingPostsId}`; //A.isFinish가 1이 되어야 매칭완료 처리
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
}

const matchingSituationService = new MatchingSituationService(
  MatchingSituation
);

export { matchingSituationService };
