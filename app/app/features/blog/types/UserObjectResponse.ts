export type UserObjectResponse =
  | {
      type: 'person';
      person: { email?: string };
      name: string | null;
      avatar_url: string | null;
      id: string;
      object: 'user';
    }
  | {
      type: 'bot';
      bot:
        | {}
        | {
            owner:
              | {
                  type: 'user';
                  user:
                    | {
                        type: 'person';
                        person: { email: string };
                        name: string | null;
                        avatar_url: string | null;
                        id: string;
                        object: 'user';
                      }
                    | { id: string; object: 'user' };
                }
              | { type: 'workspace'; workspace: true };
          };
      name: string | null;
      avatar_url: string | null;
      id: string;
      object: 'user';
    };
