import { ClassroomJSON, UsersOtherGetResponse } from '@team-10/lib';
import { Router } from 'express';
import { getConnection } from 'typeorm';

import ClassroomEntity from '../../entity/classroom';

import UserEntity from '../../entity/user';
import { isAuthenticatedOrFail } from '../../passport';
import Server from '../../server';

export default function generateRouter(server: Server) {
  const router = Router();

  const { managers } = server;

  router.get(
    '/:userStringId',
    isAuthenticatedOrFail,
    async (req, res, next) => {
      const stringId = req.params.userStringId;
      if (!stringId || stringId === 'me') {
        return next();
      }

      const user = req.user!;
      if (stringId === user.stringId) {
      // Unreachable
        return res.redirect('/api/users/me');
      }

      const userRepository = getConnection().getRepository(UserEntity);
      const classroomRepository = getConnection().getRepository(ClassroomEntity);
      const userEntity = await userRepository.findOne({
        where: { stringId },
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            classrooms: 'user.classrooms',
          },
        },
      });

      if (!userEntity) {
        const response: UsersOtherGetResponse = {
          success: false,
          error: {
            code: 'NONEXISTENT_USER',
            statusCode: 404,
            extra: {},
          },
        };
        res.status(404).json(response);
        return;
      }

      const commonClassrooms = await classroomRepository
        .createQueryBuilder('classroom')
        .innerJoinAndSelect('classroom.members', 'members')
        .where(':me IN (members.id)', { me: user.id })
        .getMany();

      const response: UsersOtherGetResponse = {
        success: true,
        payload: {
          stringId: user.stringId,
          displayName: user.displayName,
          profileImage: user.profileImage,
          commonClassrooms: (await Promise.all(
            commonClassrooms.map(
              (classroom) => managers.classroom.getClassroomJSON(user.stringId, classroom.hash),
            ),
          )).filter((x) => !!x) as ClassroomJSON[],
        },
      };
      res.json(response);
    },
  );

  return router;
}
