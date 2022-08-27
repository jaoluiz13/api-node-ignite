import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/InMemory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppErrors";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "../../repositories/in-memory/UserTokenRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
let dateProvider: IDateProvider;
let mailProvider: MailProviderInMemory;

describe("Sen Forgot Email", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("Should be able to send an email to recovery password", async () => {
    const sendMail = spyOn(mailProvider, "sendEmail");
    await userRepositoryInMemory.create({
      driver_license: "12345",
      name: "joao test",
      email: "a@gmail.com",
      password: "123456789",
    });
    await sendForgotPasswordMailUseCase.execute("a@gmail.com");
    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a email the user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("aabcc@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("Should be able to create an users tokens", async () => {
    const generateTokenMail = spyOn(userTokenRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      driver_license: "12345",
      name: "joao test",
      email: "1234@gmail.com",
      password: "123456789",
    });
    await sendForgotPasswordMailUseCase.execute("1234@gmail.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});
