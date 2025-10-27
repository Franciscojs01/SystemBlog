class UserResponseDTO {
  constructor(user) {
    if (!user) {
      throw new Error("O objeto 'user' não pode ser nulo para o UserResponseDTO.");
    }


    this.id = user._id ? user._id.toString() : null;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;

  }
}

export default UserResponseDTO;
