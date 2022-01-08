import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { catchError, finalize, Observable, tap } from 'rxjs';

/**To create a transaction we need an established mongoose instance with a
 * database connection
 * @example @UseInterceptors(TransactionInterceptor)
 * @TransactionParam() session: MongooseClientSession,
 * @summary To abtract logic of creating and managing the transaction
 * NOTE: To be used together with the @TransactionParam custom decorator */
@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  /**Inject our mongoose instance */
  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**Create the transaction and attach it to the request using ExecutionContext */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const session = await this.connection.startSession();
    session.startTransaction();
    req.transaction = session;
    return next.handle().pipe(
      tap(async () => await session.commitTransaction()),
      catchError(async (err) => {
        await session.abortTransaction();
        return new Error(err);
      }),
      finalize(() => session.endSession()),
    );
  }
}
