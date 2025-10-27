class UserResponseDTO {
  constructor(user) {
    if (!user) {
      throw new Error(
        "O objeto 'user' não pode ser nulo para o UserResponseDTO.",
      );
    }

    this.id = user._id ? user._id.toString() : null;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}

export default UserResponseDTO;
