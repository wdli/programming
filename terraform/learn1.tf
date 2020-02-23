provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-08d489468314a58df"
  instance_type = "t2.micro"
  # vpc_security_group_ids = ["sg-0077..."]
  # subnet_id = "subnet-923a..."
}
