export const getArgsFromArgv = (argv: string[]) => {
  const args = argv.splice(2)

  return args.reduce<{ [key: string]: string | boolean }>((acc, arg, idx, arr) => {
    if (arg.charAt(0) !== '-') return acc

    const argKey = arg.charAt(1)
    const nextArg = arr[idx + 1]

    if (nextArg && nextArg.charAt(0) !== '-') {
      acc[argKey] = nextArg
      return acc
    }

    acc[argKey] = true
    return acc
  }, {})
}
