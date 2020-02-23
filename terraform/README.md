* wdlidaws1 IAM account info at ~/workspace/aws/wdli/wdliaws1/

* Finding the latest quick launch AMI instance ID 

aws ec2 describe-images --owners amazon --filters 'Name=name,Values=amzn-ami-hvm-????.??.?.????????-x86_64-gp2' 'Name=state,Values=available' --query 'reverse(sort_by(Images, &CreationDate))[:1].ImageId' --output text
