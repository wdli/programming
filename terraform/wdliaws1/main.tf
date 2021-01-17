
#
# From: https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started
#       https://medium.com/@dwdraju/dive-into-aws-with-terraform-e73652206192
#
# Note: The key pair has to be created in the same region
#       The AMI id has to be available in the same region
# 

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

#
# Variables
#
variable "region" {
  default = "us-west-1"
  
}

variable "shared-cred-file" {
  default = "/home/wdli/.aws/credentials"
}

#
# Provider
#
provider "aws" {
  profile = "default"
  region  = var.region
  shared_credentials_file = var.shared-cred-file
}

#
# Resource: <provider>_<type>
#
# EC2
#

resource "aws_instance" "my-tf-ec2-test" {

  ami = "ami-03130878b60947df3" # Amazon Linux 2
  
  #instance_type = "t2.micro"
  instance_type = "t2.medium"
  
  key_name = "wdliaws1-key-us-west-1"

  root_block_device {
    encrypted = true
  }
  
  hibernation = "true"
  
  tags = {
    Name = "my-t2med-test"
  }
}



#
#
# aws_ebs_volume
#



resource "aws_ebs_volume" "data-vol" {
  
 availability_zone = "us-west-1a"
 size = 20
  
 tags = {
        Name = "my-t2med-test-volume"
 }

}


#
#
# aws_volume_attachment
#


resource "aws_volume_attachment" "data-vol-attach" {
  
  device_name = "/dev/sda"
  volume_id = aws_ebs_volume.data-vol.id
  instance_id = aws_instance.my-tf-ec2-test.id
  
}
