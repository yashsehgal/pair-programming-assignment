
function nameInitials(name: string) {
  if (!name) return;
  let initials = name[0];
  for (let i = 0; i < name.length; i++) {
    if (name[i] === " " && name[i + 1]) {
      initials += name[i + 1];
    }
  }
  return initials;
}

export {
  nameInitials
}