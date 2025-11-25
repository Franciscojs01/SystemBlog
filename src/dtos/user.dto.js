class UserResponseDTO {
  constructor(user) {
    if (!user) {
      throw new Error(
        "O objeto 'user' não pode ser nulo para o UserResponseDTO.",
      );
    }

    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export default UserResponseDTO;
