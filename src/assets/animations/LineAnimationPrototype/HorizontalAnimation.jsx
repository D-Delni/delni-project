import LineAnimationPrototype from "./LineAnimationPrototype"

const HorizontalLineAnimation = (props) => {
  return (
    <LineAnimationPrototype
      direction="horizontal"
      lineColor="#DDA95A"
      initialSpeed={5}
      branchProbability={0.99}
      maxBranches={70}
      minDistanceBeforeBranch={600}
      delayBeforeStart={1000}
      {...props} // Allow overriding default props
    />
  )
}

export default HorizontalLineAnimation