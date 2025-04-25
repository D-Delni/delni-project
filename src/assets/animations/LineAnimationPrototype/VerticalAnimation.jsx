import LineAnimationPrototype from "./LineAnimationPrototype"

const VerticalLineAnimation = (props) => {
  return (
    <LineAnimationPrototype
      direction="vertical"
      lineColor="#DDA95A"
      initialSpeed={5}
      branchProbability={0.95}
      maxBranches={70}
      minDistanceBeforeBranch={5}
      delayBeforeStart={500}
      {...props} // Allow overriding default props
    />
  )
}

export default VerticalLineAnimation