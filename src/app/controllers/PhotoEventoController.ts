interface Request {
    // user_id: string;
    avatarFileName: string;
}

class PhotoEventoController {
    public async update({ avatarFileName }: Request): Promise<void> {
        // vamos ver se conseguimos upar no git
    }
}

export default PhotoEventoController;
